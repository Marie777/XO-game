import React from 'react'
import GameCell from './GameCell'
import _ from 'lodash'

export default function GameRow({ row, y, onMove }) {
    return (
        <div>
            { _.map(row, (cell, i) => <GameCell cell={cell} key={i} y={y} x={i} onMove={onMove} />) }
        </div>
    );
}