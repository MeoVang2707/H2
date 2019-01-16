import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import {Divider, Row, Col, Icon} from 'antd';

import {getTopUser} from '../../services/apis/UserService'
import './style.css'

/* eslint-disable react/prefer-stateless-function */
class XepHang extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      tabSelected: 'week',
      listXepHang: [
        {
          User: "Trần Trung Hiếu",
          Point: 1000
        },
        {
          User: "Trần Trung Hiếu",
          Point: 1000
        },
        {
          User: "Trần Trung Hiếu",
          Point: 1000
        },
        {
          User: "Trần Trung Hiếu",
          Point: 1000
        },
        {
          User: "Trần Trung Hiếu",
          Point: 1000
        },
        {
          User: "Trần Trung Hiếu",
          Point: 1000
        },
        {
          User: "Trần Trung Hiếu",
          Point: 1000
        },
        {
          User: "Trần Trung Hiếu",
          Point: 1000
        },
        {
          User: "Trần Trung Hiếu",
          Point: 1000
        },
        {
          User: "Trần Trung Hiếu",
          Point: 1000
        }
      ]
    };
  }

  componentDidMount(){
    this.getData();
  }

  getData = () => {
    getTopUser().then(
      res => {
        console.log(res);
        if (res.Status === 200){
          this.setState({
            listXepHang: res.topUser
          })
        }
      }
    ).catch(e => console.log(e))
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

        {this.state.listXepHang.map((user, index) => (
          <Row align="middle" type="flex" justify="space-between" className="rowThongKe" key={index}>
            <Col>{index+1}</Col>
            <Col>{user.Email}</Col>
            <Col>{user.point} HHC</Col>
          </Row>
        ))}
      </div>
    );
  }
}

XepHang.propTypes = {};

export default XepHang;
