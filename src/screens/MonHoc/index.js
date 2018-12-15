/**
 *
 * Profile
 *
 */

import React from 'react';
// import { connect,  } from 'react-redux';
// import { compose } from 'redux';
import { Row, Col } from 'antd';
import { Redirect } from 'react-router-dom';

import AppHeader from '../../commons/app-header/app-header';
import {getStorage, set} from '../../services/StorageService'
import {getListQuestionByTheme, getProfile} from '../../services/apis/UserService'
import ThongKe from '../../commons/ThongKe';
import XepHang from '../../commons/XepHang'
import Question from '../../commons/Question'
// import AddQuestion from '../../commons/AddQuestion';
import GoogleAds from "../../commons/google-ads";
import Promotion from "../../commons/promotion";
import MenuHoiHay from "../../commons/Menu";
/* eslint-disable react/prefer-stateless-function */

export class MonHoc extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      listQuestion: [],
      token: getStorage('authorization'),
      monHoc: this.props.match.params.monHoc,
      point: getStorage('point'),
    };
    this.getListAllQuestion =this.getListAllQuestion.bind(this);
    this.reloadPoint = this.reloadPoint.bind(this);
  }
  componentDidMount(){
    this.getListAllQuestion();
    this.reloadPoint()
  }

  componentDidUpdate(){
    if (this.state.monHoc !== this.props.match.params.monHoc){
      this.getListAllQuestion();
    }
  }

  reloadPoint = () => {
    getProfile().then(
      res => {
        if (res.Status === 200) {
          set('point', res.User.point);
          this.setState({
            point: res.User.point
          })
        }
      }
    )
  };

  getListAllQuestion(){
    const {monHoc} = this.props.match.params;
    this.setState({
      monHoc
    });
    getListQuestionByTheme( monHoc, 1)
      .then(res => {
        if (res.Status === 200){
          this.setState({
            listQuestion: res.listQuestion,
          })
        } else {
          alert('Tài khoản đã bị truy cập ở một nơi khác. Đăng nhập lại để tiếp tục')
        }
      })
      .catch(e => {if(e.response.status ===401){
      alert('Tài khoản đã bị truy cập ở một nơi khác. Đăng nhập lại để tiếp tục')
    }});
  }

  render() {
    if (!this.state.token) {
      return (
        <Redirect href="/" to="/" />
      );
    }
    return (
      <div>
        <AppHeader point={this.state.point} reloadPoint={this.reloadPoint}/>
        <GoogleAds />
        <Promotion />

        <Row>
          <Col span={3} offset={1}>
            <Row style={{margin: '20px'}}>
              <MenuHoiHay getListAllQuestion={this.getListAllQuestion} />
            </Row>
          </Col>

          <Col span={12} style={{padding: "10px"}} offset={1}>
            <Col span={22}>
              {this.state.listQuestion.map(question => (
                <Row style={{marginTop: "10px"}} key={question.PostId}>
                  <Question reloadPoint={this.reloadPoint} question={question} getListMyQuestion={this.getListAllQuestion} />
                </Row>
              ))}
            </Col>
          </Col>

          <Col span={5} offset={1}>
            <Row style={{margin: '20px'}}>
              <XepHang />
            </Row>
            <Row style={{margin: '20px'}}>
              <ThongKe />
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

MonHoc.propTypes = {};


export default MonHoc;