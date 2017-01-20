import React from 'react'

export default function GameOver({ gameData, onGoHome }) {
    var message;
    if(gameData.game.winner === gameData.player) {
        message = 'You are the winner!'
    }else {
        message = 'You are the looser!'
    }
    return (
        <div>
            <p>{message}</p>
            <button onClick={ onGoHome }>Go ome</button>
        </div>
    );
}