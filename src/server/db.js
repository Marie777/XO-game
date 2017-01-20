var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/xo');

var GameData = mongoose.model('GameData', {
    gameState: {
        turn: Number,
        winner: Number,
        board: [[Number]]
    },
    players: [String],
    room: { type: String, index: true }
});

module.exports = {
    GameData: GameData
};