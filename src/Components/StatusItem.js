import React from 'react';
import './StatusItem.css';

class StatusItem extends React.Component {
    render() {
        return (
            <div className={"item"}>
                <span>{this.props.itemKey}</span> <span className={this.props.classes}>{this.props.itemValue}</span>
            </div>
        );
    }
}

export default StatusItem;
