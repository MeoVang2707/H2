import React from 'react';
import spinnerImg from '../../assets/images/spinner.png';

class Spin extends React.Component {
    render() {
        const {size, center} = this.props;
        const centerStl = {
            paddingLeft: '50%',
            marginLeft: `-${parseInt(size, 10)/2}px`
        };

        return (
            <div className="fms-spin" style={center ? centerStl : null}>
                <img className="spinner" alt="spinner" src={spinnerImg} height={size + 'px'} width={size + 'px'}/>
            </div>
        );
    }
}

Spin.defaultProps = {
    size: 35
};

export default Spin;
