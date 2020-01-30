import React from 'react';
import './MotorVisualizer.css'
import Motor from "./Motor";

class MotorVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {motors: this.props.motors};
    }

    render() {
        let motors = [];
        this.props.motors.forEach((motor) => {
            motors.push(<Motor throttle={motor.throttle}/>);
        });
        return (
            <div className="motors">
                <h4>Motors</h4>
                <div>
                    {motors}
                </div>
            </div>
        );
    }
}

export default MotorVisualizer;
