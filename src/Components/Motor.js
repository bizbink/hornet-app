import React from 'react';

class Motor extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(throttle) {
        this.props.onMotorChange(throttle);
    }

    render() {
        return (
            <div className={"motor"}>
                <span>{this.props.throttle}</span>
            </div>
        );
    }
}

export default Motor;
