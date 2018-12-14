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
import {getStorage} from '../../services/StorageService'
import {getListQuestionByTheme} from '../../services/apis/UserService'
import ThongKe from '../../commons/ThongKe';
import XepHang from '../../commons/XepHang'
import Question from '../../commons/Question'
import AddQuestion from '../../commons/AddQuestion';
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
    };
    this.getListAllQuestion =this.getListAllQuestion.bind(this);
  }
  componentDidMount(){
    this.getListAllQuestion();
    console.log('monHoc', );
  }

  getListAllQuestion(){
    getListQuestionByTheme(1, this.props.match.params.monHoc)
      .then(res => {
        console.log('MonHoc', res);
        if (res.Status === 200){
          this.setState({
            listQuestion: res.listQuestion,
          })
        } else {
          alert('Tài khoản đã bị truy cập ở một nơi khác. Đăng nhập lại để tiếp tục')
        }
      })
      .catch(() => alert('Tài khoản đã bị truy cập ở một nơi khác. Đăng nhập lại để tiếp tục'));
  }

  render() {
    if (!this.state.token) {
      return (
        <Redirect href="/" to="/" />
      );
    }
    return (
      <div>
          <AppHeader />
          <GoogleAds />
          <Promotion />

        <Row>
          <Col span={3} offset={1}>
            <Row style={{margin: '20px'}}>
              <MenuHoiHay />
            </Row>
          </Col>

          <Col span={12} style={{padding: "10px"}} offset={1}>
            <Col span={22}>
              {this.state.listQuestion.map(question => (
                <Row style={{marginTop: "10px"}} key={question.PostId}>
                  <Question question={question} getListAllQuestion={this.getListAllQuestion} />
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