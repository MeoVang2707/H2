
import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {Divider, Row} from 'antd';

import {getProfile} from '../../services/apis/UserService'
import './style.css';
/* eslint-disable react/prefer-stateless-function */
class MyInfor extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      myInfor: {}
    }
  }
  componentDidMount(){
    this.getProfile()
  }

  getProfile = () => {
    getProfile().then(
      res => {
        if (res.Status === 200){
          this.setState({
            myInfor: res.User
          })
        }
      }
    )
  }

  render() {
    const {myInfor} = this.state;
    return (
      <div className="thongKe">
        <Row type="flex" align="middle" className="titleThongKe">Thông tin cá nhân</Row>
        <Divider style={{margin:0}}/>
        <Row align="middle" type="flex" justify="space-between" className="rowThongKe">
          <span>Email</span>
          <span>{myInfor.Email}</span>
        </Row>

        <Row align="middle" type="flex" justify="space-between" className="rowThongKe">
          <span>Điện thoại</span>
          <span>{myInfor.Phone ? myInfor.Phone : "Chưa có"}</span>
        </Row>

        <Row align="middle" type="flex" justify="space-between" className="rowThongKe">
          <span>Điểm</span>
          <span>{myInfor.point}</span>
        </Row>

        <Row align="middle" type="flex" justify="space-between" className="rowThongKe">
          <span>Số câu hỏi đã đăng</span>
          <span>{this.props.numberPost}</span>
        </Row>
      </div>
    );
  }
}

MyInfor.propTypes = {
  numberPost: PropTypes.number,
};

export default MyInfor;
