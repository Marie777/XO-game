var socketIO = require('socket.io');
var game = require('./game');
var _ = require("lodash");
var {GameData} = require('./db');

function startXOApp(Q, games, port) {
    var io = socketIO(port);

    /**
     * When user connected register listeners.
     */
    io.on('connect', function (socket) {

        /**
         * When user disconnects remove him from waiting queue.
         * If he was playing tell second player that he won the game.
         */
        socket.on('disconnect', function() {
            Q.remove(socket.id);

            if(socket.playingRoom) {
                GameData.findOne({ room: socket.playingRoom }, function(err, gameData) {
                    if(!err && gameData) {
                        var gameState = gameData.gameState;
                        var player = _.indexOf(gameData.players, socket.id);

                        gameState.winner = player ? 0 : 1;
                        io.to(gameData.players[gameState.winner]).emit('game-state', gameState);

                        gameData.remove();
                    }
                });
            }
        });

        /**
         * When user is ready to play add hit to waiting queue.
         */
        socket.on('ready-to-play', function() {
            Q.enqueue(socket.id);
        });

        /**
         * Listen to user moves, and if moves are valid, send new state to both players.
         */
        socket.on('move', function(data) {
            var room = data.room;
            var move = data.move;

            GameData.findOne({room: room}, function(err, gameData) {
                if(!err) {
                    var player = _.indexOf(gameData.players, socket.id);

                    if(player !== -1) {
                        var nextState = game.move(gameData.gameState, move, player);
                        if(nextState.winner !== null) {
                            gameData.remove(function(err) {
                                if(!err) {
                                    io.to(room).emit('game-state', nextState);
                                }
                            });
                        } else {
                            gameData.gameState = nextState;
                            gameData.save(function(err) {
                                if(!err) {
                                    io.to(room).emit('game-state', nextState);
                                }
                            });
                        }
                    }
                }
            });
        });

        console.log('New connection!');
    });

    /**
     * Every second check if there is enough player in queue to start a game. If true start a game.
     */
    setInterval(function(io) {
        var qCount = Q.count();
        console.log("Q size: ", qCount);
        if(qCount >= 2) {
            var playerId1 = Q.dequeue();
            var playerId2 = Q.dequeue();

            var player1 = io.sockets.connected[playerId1];
            var player2 = io.sockets.connected[playerId2];

            var playingRoom = playerId1 + "_" + playerId2;
            player1.playingRoom = playingRoom;
            player2.playingRoom = playingRoom;

            player1.join(playingRoom, function() {
                player2.join(playingRoom, function () {
                    startGame(playingRoom, player1, player2);
                });
            });

        }
    }, 1000, io);

    /**
     * Send players initial game data.
     * Add the game to games map.
     * @param room
     * @param player1
     * @param player2
     */
    function startGame(room, player1, player2) {
        var gameState = game.createGameState();
        var gameData = new GameData({
            room: room,
            gameState: gameState,
            players: [player1.id, player2.id]
        });

        gameData.save(function(err) {
            if(!err) {
                player1.emit('start', {game: gameState, room: room, player: 0});
                player2.emit('start', {game: gameState, room: room, player: 1});
                console.log("Start a game in room " + room);
            }
        });
    }
}

module.exports = {
    startXOApp: startXOApp
};