import React from 'react';
import './StatusItem.css';

class ConsoleItem extends React.Component {
    render() {
        return (
                <div>{this.props.log}</div>
        );
    }
}

export default ConsoleItem;
