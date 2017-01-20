var _ = require("lodash");

/**
 * Return initial game state.
 *
 * @returns {{turn: number, winner: null, board: *[]}}
 */
function createGameState() {
    return {
        'turn': 0,
        'winner': null,
        'board': [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
    }
}

/**
 * Initiate move and return next state.
 *
 * @param gameState
 * @param move
 * @param player
 * @returns {*}
 */
function move(gameState, move, player) {
    if(isValidMove(gameState, move, player)) {
        gameState.board[move[1]][move[0]] = gameState.turn % 2;
        gameState.winner = getWinner(gameState.board);
        gameState.turn++;
    }
    return gameState;
}

/**
 * Check that given move for given game state is valid.
 * @param gameState
 * @param move
 * @param player
 * @returns {boolean}
 */
function isValidMove(gameState, move, player) {
    return gameState.board[move[1]][move[0]] === null && gameState.turn % 2 === player && gameState.winner === null;
}

/**
 * Check if there is a winner in given game board and return the winner.
 * If no winner return null.
 * 
 * @param rows
 * @returns {*}
 */
function getWinner(rows) {
    var lines = [].concat(rows).concat(_.zip(...rows));
    lines.push([rows[0][0], rows[1][1], rows[2][2]]);
    lines.push([rows[0][2], rows[1][1], rows[2][0]]);
    var winLines = _(lines)
        .map(_.uniq)
        .filter(function(line) {
            return line.length === 1 && line[0] !== null;
        });
    if(winLines.size()) {
        return winLines.first()[0]
    }
    return null;
}

module.exports = {
    createGameState: createGameState,
    move: move
};
