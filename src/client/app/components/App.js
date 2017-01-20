import React from 'react';

class App extends React.Component {
    render () {
        const { children } = this.props;
        return (
            <div>
                <h1>XO play</h1>
                {children}
            </div>
        );
    }
}

export default App;