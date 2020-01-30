import React from 'react';
import './Controller.css'
import 'joypad.js/dist/joypad';
import io from 'socket.io-client';

class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            motors: props.motors,
            axes: {
                left: {
                    x: 0.00.toFixed(2),
                    y: 0.00.toFixed(2)
                },
                right: {
                    x: 0.00.toFixed(2),
                    y: 0.00.toFixed(2)
                }
            }
        };
    }

    updateAxes(data) {
        let {axisMovementValue, axis} = data;
        let value = (Math.abs(axisMovementValue) < .1 ? 0.0.toFixed(2) : axisMovementValue);

        switch (axis) {
            case 0:
                this.setState((prevState, props) => ({
                    axes: {
                        ...prevState.axes,
                        left: {
                            ...prevState.axes.left,
                            x: value
                        }
                    },
                }));
                break;
            case 1:
                this.setState((prevState, props) => ({
                    axes: {
                        ...prevState.axes,
                        left: {
                            ...prevState.axes.left,
                            y: value
                        }
                    },
                }));
                break;
            case 2:
                this.setState((prevState, props) => ({
                    axes: {
                        ...prevState.axes,
                        right: {
                            ...prevState.axes.right,
                            x: value
                        }
                    },
                }));
                break;
            case 3:
                this.setState((prevState, props) => ({
                    axes: {
                        ...prevState.axes,
                        right: {
                            ...prevState.axes.right,
                            y: value
                        }
                    },
                }));
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        window.joypad.on('connect', e => {
            this.props.onControllerChange(true);
        });

        window.joypad.set({axisMovementThreshold: 0.01});

        let host = 'http://' + window.location.hostname + ':3030';
        const socket = io(host, {timeout: 1000});
        socket.on('connect_timeout', () => {
            this.props.onSocketChange(false);
        });

        socket.on('connect', () => {
            this.props.onSocketChange(true);

            let startTime;
            setInterval(() => {
                startTime = Date.now();
                socket.emit('ping');
            }, 1000);

            socket.on('pong', () => {
                this.props.onPingPong(new Date().getTime() - startTime);
            });

            let movements = [];
            window.joypad.on('axis_move', e => {
                let {axisMovementValue, axis} = e.detail;
                axisMovementValue = axisMovementValue.toFixed(1);
                axisMovementValue = (Math.abs(axisMovementValue) < .1 ? 0 : axisMovementValue);

                if (movements[axis] !== axisMovementValue) {
                    this.updateAxes({axisMovementValue, axis});
                    socket.emit('axis_move', {axisMovementValue, axis});
                    movements[axis] = axisMovementValue;
                }
            });

        });

        socket.on('initializeMotors', (motors) => {
            this.props.onMotorsInitialization(motors);
        });

        socket.on('motors', (data) => {
            data.forEach((newMotor) => {
                this.props.onMotorChange(newMotor);
            })
        });
    }

    render() {
        return (
            <div className="controller">
                <h4>Controller</h4>
                <div>
                    <div className={"inputs"}>
                        <table>
                            <thead>
                            <tr>
                                <th colSpan="2">Triggers</th>
                            </tr>
                            </thead>
                            <tr>
                                <td>X:</td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <td>Y:</td>
                                <td>0.00</td>
                            </tr>
                        </table>
                        <table>
                            <thead>
                            <tr>
                                <th colSpan="2">Left Axes</th>
                            </tr>
                            </thead>
                            <tr>
                                <td>X:</td>
                                <td>{this.state.axes.left.x}</td>
                            </tr>
                            <tr>
                                <td>Y:</td>
                                <td>{this.state.axes.left.y}</td>
                            </tr>
                        </table>
                        <table>
                            <thead>
                            <tr>
                                <th colSpan="2">Right Axes</th>
                            </tr>
                            </thead>
                            <tr>
                                <td>X:</td>
                                <td>{this.state.axes.right.x}</td>
                            </tr>
                            <tr>
                                <td>Y:</td>
                                <td>{this.state.axes.right.y}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Controller;
