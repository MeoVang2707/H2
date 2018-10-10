import React, { Fragment } from 'react';
import {
    MenuItem,
    Navbar,
    Nav,
    NavDropdown,
    NavItem
} from 'react-bootstrap';
import PropTypes from 'prop-types';
export default class GoogleAds extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);

        this.state = {
        };
    }

    render() {

        // let isLogin = () => this.setState({ isLogin: false });
        return (
            <div className="google-ads">
                Google ads
      </div>
        )
    }
}