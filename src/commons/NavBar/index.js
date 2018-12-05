/**
 *
 * NavBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {Row, Icon} from 'antd';
import './style.css';

/* eslint-disable react/prefer-stateless-function */
class NavBar extends React.PureComponent {
  render() {
    return(
      <Row type="flex" className="navBar" justify="space-around" align="middle">
        <button>Toán</button>
        <button>Vật lý</button>
        <button>Hóa học</button>
        <button>Sinh học</button>
        <button>Văn học</button>
        <button>Tiếng Anh</button>
        <button>Địa lý</button>
        <button>Lịch sử</button>
        <Icon type="right" style={{fontSize: '18px'}} />
      </Row>
    );
  }
}

NavBar.propTypes = {};

export default NavBar;
