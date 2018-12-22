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
  constructor(props){
    super(props);
    this.state={
      thongKe: {
        thanhVien: 100,
        dangOnline: 10,
        soCauHoi: 100,
        soCauTraLoi: 500,
      }
    }
  }
  render() {
    const {thongKe} = this.state;
    return (
      <div className="thongKe">
        <Row type="flex" align="middle" className="titleThongKe">Thống kê</Row>
        <Divider style={{margin:0}}/>
        <Row align="middle" type="flex" justify="space-between" className="rowThongKe">
          <span>Thành viên</span>
          <span>{thongKe.thanhVien}</span>
        </Row>
        <Row align="middle" type="flex" justify="space-between" className="rowThongKe">
          <span>Đang online</span>
          <span>{thongKe.dangOnline}</span>
        </Row>
        <Row align="middle" type="flex" justify="space-between" className="rowThongKe">
          <span>Số câu hỏi</span>
          <span>{thongKe.soCauHoi}</span>
        </Row>
        <Row align="middle" type="flex" justify="space-between" className="rowThongKe">
          <span>Số câu trả lời</span>
          <span>{thongKe.soCauTraLoi}</span>
        </Row>
      </div>
    );
  }
}

ThongKe.propTypes = {};

export default ThongKe;
