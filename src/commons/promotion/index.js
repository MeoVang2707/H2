import React from 'react';
import {
  Carousel,
  // Navbar,
  // Nav,
  // NavDropdown,
  // NavItem
} from 'antd';
import PropTypes from 'prop-types';

export default class Promotion extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    return (
      <Carousel autoplay>
        <div><h3>Học</h3></div>
        <div><h3>Học nữa</h3></div>
        <div><h3>Học mãi</h3></div>
      </Carousel>
    )
  }
}