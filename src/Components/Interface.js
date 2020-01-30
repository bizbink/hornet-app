import React from 'react';
import Status from "./Status";
import Camera from "./Camera";
import './Interface.css'

class Interface extends React.Component {
    render() {
        return (
            <div className="interface">
                <Status latency={this.props.latency} socketStatus={this.props.socketStatus} controllerStatus={this.props.controllerStatus}/>
                <Camera/>
            </div>
        );
    }
}

export default Interface;
