import React from 'react';
import './Console.css'

class Console extends React.Component {
    render() {
        return (
            <div className="console">
                <h4>Console</h4>
                <div>
                    <div className={"terminal"}>
                        <div className={"output"}>
                            {this.props.logs}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Console;
