import React from 'react';
import './Status.css';
import StatusItem from "./StatusItem";

class Status extends React.Component {
    render() {
        let socketStatus;
        if (this.props.socketStatus) {
            socketStatus = <StatusItem itemKey="Socket:" classes={"okay"} itemValue="Connected"/>;
        } else {
            socketStatus = <StatusItem itemKey="Socket:" classes={"fail"} itemValue="Disconnected"/>;
        }

        let controllerStatus;
        if (this.props.controllerStatus) {
            controllerStatus = <StatusItem itemKey="Controller:" classes={"okay"} itemValue="Connected"/>;
        } else {
            controllerStatus = <StatusItem itemKey="Controller:" classes={"fail"}
                                       itemValue={this.props.controllerStatus === null ? "Unknown" : "Disconnected"}/>;
        }

        return (
            <div className="status">
                <h4>Status</h4>
                <div>
                    {socketStatus}
                    {controllerStatus}
                    <StatusItem itemKey="Battery:" classes={"unavailable"} itemValue="N/A"/>
                    <StatusItem itemKey="Wireless Strength:" classes={"unavailable"} itemValue="N/A"/>
                    <StatusItem itemKey="Latency:" classes={""} itemValue={(this.props.latency / 1000) + "ms"}/>
                </div>
            </div>
        );
    }
}

export default Status;
