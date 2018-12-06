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
import './style.css';
/* eslint-disable react/prefer-stateless-function */

export class Profile extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      listQuestion: [],
      token: getStorage('authorization')
    }
  }
  componentDidMount(){
    this.state.token ? this.getListMyQuestion() : null;
  }

  getListMyQuestion(){
    console.log('ssss', getStorage('authorization'))
    getMyQuestion()
      .then(res => {
        console.log(res);
        this.setState({
          listQuestion: res.myQuestion,
        })
      })
  }

  render() {
    if (!this.state.token) {
      return (
        <Redirect href="/" to="/" />
      );
    }
    return (
      <div>
        <Row>
          <Header />
        </Row>

        <Row>
          <Col span={6}>
            <Row style={{margin: '20px'}}>
              <XepHang />
            </Row>
            <Row style={{margin: '20px'}}>
              <ThongKe />
            </Row>
          </Col>
          <Col span={10} style={{padding: "10px"}}>
            {this.state.listQuestion.map(question => (
              <Row style={{marginTop: "10px"}} key={question.PostId}>
                <Question question={question} />
              </Row>
            ))}

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