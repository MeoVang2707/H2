/**
 *
 * XepHang
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import {Divider, Row, Col, Icon} from 'antd';
import './style.css'
/* eslint-disable react/prefer-stateless-function */
class XepHang extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      tabSelected: 'week',
    };
  }
  render() {
    return (
      <div className="thongKe">
        <Row type="flex" align="middle" className="titleThongKe">
          <Col span={11}>
            <span>Xếp hạng</span>
            <Icon type="down" />
          </Col>
          <Col
            span={5}
            offset={1}
            style={this.state.tabSelected === "week" ? {color:"#28B446"} : null}
            onClick={() => this.setState({tabSelected: "week"})}
            className="tabSelect"
          >
            Tuần
          </Col>
          <Col
            span={5}
            offset={1}
            style={this.state.tabSelected === "month" ? {color:"#28B446"} : null}
            onClick={() => this.setState({tabSelected: "month"})}
            className="tabSelect"
          >
            Tháng
          </Col>
        </Row>
        <Divider style={{margin:0}}/>
        <Row align="middle" type="flex" justify="space-between" className="rowThongKe">
          <Col>1</Col>
          <Col>Trần Trung Hiếu</Col>
          <Col>1000 HHC</Col>
        </Row>
        <Row align="middle" type="flex" justify="space-between" className="rowThongKe">
          <Col>2</Col>
          <Col>Trần Trung Hiếu</Col>
          <Col>1000 HHC</Col>
        </Row>
        <Row align="middle" type="flex" justify="space-between" className="rowThongKe">
          <Col>3</Col>
          <Col>Trần Trung Hiếu</Col>
          <Col>1000 HHC</Col>
        </Row>
        <Row align="middle" type="flex" justify="space-between" className="rowThongKe">
          <Col>4</Col>
          <Col>Trần Trung Hiếu</Col>
          <Col>1000 HHC</Col>
        </Row>
        <Row align="middle" type="flex" justify="space-between" className="rowThongKe">
          <Col>5</Col>
          <Col>Trần Trung Hiếu</Col>
          <Col>1000 HHC</Col>
        </Row>
        <Row align="middle" type="flex" justify="space-between" className="rowThongKe">
          <Col>6</Col>
          <Col>Trần Trung Hiếu</Col>
          <Col>1000 HHC</Col>
        </Row>
      </div>
    );
  }
}

XepHang.propTypes = {};

export default XepHang;
