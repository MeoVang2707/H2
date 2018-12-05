/**
 *
 * Header
 *
 */

import React from 'react';
import { Col, Row, Menu, Dropdown, Icon } from 'antd';

import imgSearch from './images/seach.png';
import imgAva from './images/ava.jpg';

import './style.css';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="/">Hồ sơ</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="/">Thưởng điểm</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="/">Thông báo</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="/">Đăng xuất</a>
    </Menu.Item>
  </Menu>
);

/* eslint-disable react/prefer-stateless-function */
class Header extends React.PureComponent {
  render() {
    return (
      <Row className="header" type="flex" align="middle">
        <Col span={6}>
          <span className="webName">Hoihay.vn</span>
          <span className="sologan">Hỏi đáp chất lượng cao</span>
        </Col>

        <Col span={3}>
          <button className="buttonMoiNhat">
            <span>Mới nhất</span>
          </button>
        </Col>

        <Col span={3}>
          <button className="buttonhoiHayNhat">
            Hỏi hay nhất
          </button>
        </Col>

        <Col span={4}>
          <button className="buttonCauHoiCuaToi">
            Câu hỏi của tôi
          </button>
        </Col>

        <Col span={6} offset={2} className="userInfor">
          <Row type="flex" justify="end">
            <img src={imgSearch} />
            <span className="numberHHC">50 HHC</span>
            <img src={imgAva} className="imgAva" />
            <Dropdown overlay={menu}>
              <span className="ant-dropdown-link">
                Trung Hiếu <Icon type="down" style={{fontSize: '18px'}} />
              </span>
            </Dropdown>
          </Row>
        </Col>
      </Row>
    );
  }
}

Header.propTypes = {};

export default Header;

