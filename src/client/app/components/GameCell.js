import React from 'react'

export default function GameCell({ cell, onMove, x, y }) {
    var cellChar;
    switch(cell) {
        case 0:
            cellChar = 'X';
            break;
        case 1:
            cellChar = 'O';
            break;
        default:
            cellChar = '_';
    }

    return <button onClick={() => onMove(x, y)}>{cellChar}</button>
}