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

import Header from '../../commons/app-header/app-header';
import {getStorage} from '../../services/StorageService'
import {getMyQuestion} from '../../services/apis/UserService'
import ThongKe from '../../commons/ThongKe';
import XepHang from '../../commons/XepHang'
import Question from '../../commons/Question'
import AddQuestion from '../../commons/AddQuestion'
import MyInfor from '../../commons/MyInfor'
import './style.css';
/* eslint-disable react/prefer-stateless-function */

export class Profile extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      listQuestion: [],
      token: getStorage('authorization'),
      numberPost: 0
    };
    this.getListMyQuestion =this.getListMyQuestion.bind(this);
  }
  componentDidMount(){
    this.getListMyQuestion();
  }

  getListMyQuestion(){
    getMyQuestion()
      .then(res => {
        if (res.Status === 200){
          this.setState({
            listQuestion: res.myQuestion,
            numberPost: res.myQuestion.length
          })
        } else {
          alert('Tài khoản đã bị truy cập ở một nơi khác. Đăng nhập lại để tiếp tục')
        }
      })
      .catch(e => console.log(e));
  }

  render() {
    if (!this.state.token) {
      return (
        <Redirect href="/" to="/" />
      );
    }
    return (
      <div>
        <Row style={{height: "60px"}}>
          <Header />
        </Row>

        <Row>
          <Col span={6} offset={1}>
            <Row style={{margin: '20px'}}>
              <XepHang />
            </Row>
            <Row style={{margin: '20px'}}>
              <ThongKe />
            </Row>
          </Col>
          <Col span={12} style={{padding: "10px"}}>
            <Col span={22}>
              <AddQuestion getListMyQuestion={this.getListMyQuestion}/>
            </Col>
            <Col span={22}>
              {this.state.listQuestion.map(question => (
                <Row style={{marginTop: "10px"}} key={question.PostId}>
                  <Question question={question} getListMyQuestion={this.getListMyQuestion} />
                </Row>
              ))}
            </Col>
          </Col>

          <Col span={5}>
            <Row style={{margin: '20px'}}>
              <MyInfor numberPost={this.state.numberPost} />
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

Profile.propTypes = {};

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }
//
// const withConnect = connect(
//   null,
//   mapDispatchToProps,
// );

// export default compose(withConnect)(OrderRateDetail);

export default Profile;