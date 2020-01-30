import React from 'react';

class CameraDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="camera">
                <video></video>
            </div>
        );
    }
}

export default CameraDisplay;
