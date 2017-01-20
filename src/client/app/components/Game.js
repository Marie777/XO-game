import React from 'react'
import Loading from './Loading'
import io from 'socket.io-client'
import _ from 'lodash'
import GameOver from './GameOver';
import GameBoard from './GameBoard'

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameData: null,
            socket: null
        }
    }

    onGameState(gameState) {
        this.setState({
            gameData: _.merge({}, this.state.gameData, {game: gameState})
        });
    }

    onStart(data) {
        this.setState({
            gameData: data
        });
    }

    onMove(x, y) {
        const { socket, gameData } = this.state;
        if(socket) {
            socket.emit('move', _.merge({move: [x, y]}, gameData));
        }
    }

    componentWillMount() {
        const socket = io('http://localhost:81/');
        socket.on('start', this.onStart.bind(this));
        socket.on('game-state', this.onGameState.bind(this));

        socket.emit('ready-to-play');

        this.setState({
            socket: socket
        })
    }

    componentWillUnmount() {
        if(this.state.socket) {
            this.state.socket.close()
        }
    }

    onGoHome() {
        this.props.router.replace('/');
    }

    render() {
        const { gameData } = this.state;

        if(gameData) {
            if(gameData.game.winner !== null) {
                return <GameOver gameData={gameData} onGoHome={this.onGoHome.bind(this)} />
            } else {
                const board = gameData.game.board;
                return <GameBoard board={board} onMove={this.onMove.bind(this)}/>;
            }
        } else {
            return <Loading />
        }
    }
}

export default Game;