import React from 'react';
import Spin from '../spinner/Spin.jsx';

class Loading extends React.Component {
    render() {
        return (
            <div className="loading-wrapper">
                <div className="center">
                    <Spin size={50}/>
                </div>
            </div>
        )
    }
}

export default Loading;
