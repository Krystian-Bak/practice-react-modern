import React from 'react';

import Clock from './Clock';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
        };
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            const date = new Date();
            this.setState({ date });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        // eslint-disable-next-line no-console
        console.log('test');
        // or add .exlintrc "non-console": "off"

        const { date } = this.state;

        return date ? <Clock date={date} /> : null;
    }
}

export default App;
