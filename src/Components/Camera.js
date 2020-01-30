import React from 'react';
import './Camera.css'

class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        }
    }

    render() {
        return (
            <div className="camera">
                <h4>Camera</h4>
                <div>
                </div>
            </div>
        );
    }
}

export default Camera;
