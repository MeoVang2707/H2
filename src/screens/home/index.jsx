import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Button,FormGroup,InputGroup,FormControl } from 'react-bootstrap';
class Home extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }

    static contextTypes = {
        router: PropTypes.object
    }
    onClickBtn() {
       
    }
    render() {
        const {titleSearch , textBtSearch} = this.state;
        return (
            <div>
                <div className="home">
                </div>
            </div>
        );
    }
}

export default Home;