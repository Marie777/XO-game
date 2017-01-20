import React from 'react'
import { browserHistory } from 'react-router'

class Home extends React.Component {
    readyToPlay() {
        browserHistory.push('/game');
    }

    render() {
        const { router } = this.props;

        return (
            <button onClick={ this.readyToPlay.bind(this) }>Play</button>
        );
    }
}

export default Home;