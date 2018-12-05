/**
 *
 * ThongKe
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {Divider, Row} from 'antd';
import './style.css';
/* eslint-disable react/prefer-stateless-function */
class ThongKe extends React.PureComponent {
  render() {
    return (
      <div className="thongKe">
        <Row type="flex" align="middle" className="titleThongKe">Thống kê</Row>
        <Divider style={{margin:0}}/>
        <Row align="middle" type="flex" justify="space-between" className="rowThongKe">
          <span>Thành viên</span>
          <span>100</span>
        </Row>
        <Row align="middle" type="flex" justify="space-between" className="rowThongKe">
          <span>Đang online</span>
          <span>100</span>
        </Row>
        <Row align="middle" type="flex" justify="space-between" className="rowThongKe">
          <span>Số câu hỏi</span>
          <span>100</span>
        </Row>
        <Row align="middle" type="flex" justify="space-between" className="rowThongKe">
          <span>Số câu trả lời</span>
          <span>100</span>
        </Row>
      </div>
    );
  }
}

ThongKe.propTypes = {};

export default ThongKe;
