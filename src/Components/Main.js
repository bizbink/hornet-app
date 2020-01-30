import React from 'react';
import Interface from "./Interface";
import Console from "./Console";
import MotorVisualizer from "./MotorVisualizer";
import Controller from "./Controller";
import ConsoleItem from "./ConsoleItem";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleMotorChange = this.handleMotorChange.bind(this);
        this.handleSocketChange = this.handleSocketChange.bind(this);
        this.handleControllerChange = this.handleControllerChange.bind(this);
        this.handleMotorsInitialization = this.handleMotorsInitialization.bind(this);
        this.handlePingPong = this.handlePingPong.bind(this);
        this.state = {
            logs: [],
            socketStatus: false,
            controllerStatus: null,
            latency: null,
            motors: [
                {id: 'm1', throttle: null},
                {id: 'm2', throttle: null},
                {id: 'm3', throttle: null},
                {id: 'm4', throttle: null},
            ]
        };
    }

    handleSocketChange(status) {
        if (this.state.socketStatus !== status) {
            if (status) {
                this.state.logs.push(<ConsoleItem
                    log={<div><span className={"success"}>Socket connected</span></div>}/>);
            } else {
                this.state.logs.push(<ConsoleItem
                    log={<div><span className={"fail"}>Socket disconnected</span></div>}/>);
            }
        }
        this.setState({socketStatus: status});
    }

    handleControllerChange(status) {
        if (status) {
            this.state.logs.push(<ConsoleItem
                log={<div><span className={"success"}>Controller connected</span></div>}/>);
        } else {
            this.state.logs.push(<ConsoleItem
                log={<div><span className={"fail"}>Controller disconnected</span></div>}/>);
        }
        this.setState({controllerStatus: status});
    }

    handleMotorsInitialization(motors) {
        this.setState({
            motors: motors
        });
    }

    handleMotorChange(change) {
        this.setState((prevState, props) => {
            let motors = prevState.motors;
            let motor = motors.find((motor) => motor.id === change['id']);
            motor.throttle = change['throttle']['abs'];
            return {motors: motors};
        });
    }

    handlePingPong(latency) {
        this.setState({latency: latency});
    }

    render() {
        return (
            <main className="App-container">
                <Interface latency={this.state.latency} socketStatus={this.state.socketStatus}
                           controllerStatus={this.state.controllerStatus}/>
                <Console logs={this.state.logs}/>
                <MotorVisualizer motors={this.state.motors}/>
                <Controller onPingPong={this.handlePingPong} onMotorChange={this.handleMotorChange}
                            onControllerChange={this.handleControllerChange} onSocketChange={this.handleSocketChange}
                            onMotorsInitialization={this.handleMotorsInitialization} motors={this.state.motors}/>
            </main>
        );
    }
}

export default Main;
