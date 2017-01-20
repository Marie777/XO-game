import React from 'react'
import _ from 'lodash'
import GameRow from './GameRow'

export default function GameBoard({ board, onMove }) {
    return (
        <div>
            { _.map(board, (row, i) => <GameRow row={row} key={i} onMove={onMove} y={i} />) }
        </div>
    );
}