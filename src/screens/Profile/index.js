/**
 *
 * Profile
 *
 */

import React from 'react';
// import { connect,  } from 'react-redux';
// import { compose } from 'redux';
import { Row, Col } from 'antd';
import axios from 'axios';
import Header from '../../commons/app-header/app-header';
// import NavBar from '../../commons/NavBar';
import ThongKe from '../../commons/ThongKe';
import XepHang from '../../commons/XepHang'
import Question from '../../commons/Question'
import './style.css';
/* eslint-disable react/prefer-stateless-function */

export class Profile extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      listQuestion: []
    }
  }
  componentDidMount(){
    this.getListMyQuestion();
  }

  getListMyQuestion(){
    axios.get(`https://frozen-garden-23187.herokuapp.com/api/question/myQuestion`,
      {
        headers: {
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRoaW5oQGdtYWlsLmNvbSIsImlhdCI6MTU0NDAxNTQ5MSwiZXhwIjoxNTQ0MTg4MjkxfQ.NzUSAGJmwtjmIsYCeKZpCBJUVmiw3CA47mXKSvRL7dk'
        }
      })
      .then(res => {
        // console.log('aaa', res.data.myQuestion[0]);
        this.setState({
          listQuestion: res.data.myQuestion,
        })
      })
  }

  render() {
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