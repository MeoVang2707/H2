/**
 *
 * NavBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {Menu} from 'antd';
import {listMonHoc} from "../../utils/constant";

// import './style.css';

/* eslint-disable react/prefer-stateless-function */
class MenuHoiHay extends React.PureComponent {
  render() {
    return(
      <Menu
        // defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        mode="inline"
        // inlineCollapsed={this.state.collapsed}
      >
        {listMonHoc.map(monHoc => (
            <Menu.Item key={monHoc.id}>
              <span>{monHoc.name}</span>
            </Menu.Item>
          ))
        }
      </Menu>
    );
  }
}

MenuHoiHay.propTypes = {};

export default MenuHoiHay;
