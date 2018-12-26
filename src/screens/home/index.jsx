import React from 'react';
import {Row, Col} from 'antd';

import {getStorage} from '../../services/StorageService'
import {getListQuestion} from '../../services/apis/UserService'
import ThongKe from '../../commons/ThongKe';
import XepHang from '../../commons/XepHang'
import MenuHoiHay from '../../commons/Menu'
import AddQuestion from "../../commons/AddQuestion";
import Question from "../../commons/Question";
// import './style.css';
/* eslint-disable react/prefer-stateless-function */

export class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listQuestion: [],
      token: getStorage('authorization'),
      numberPost: 0
    };
    this.getListAllQuestion = this.getListAllQuestion.bind(this);
  }

  componentDidMount() {
    // this.getListAllQuestion();
  }

  getListAllQuestion() {
    getListQuestion(1)
      .then(res => {
        // console.log('trangChu', res);
        if (res.Status === 200) {
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
    return (
      <div>
        <Row>
          <Col span={3} offset={1}>
            <Row style={{margin: '20px'}}>
              <MenuHoiHay/>
            </Row>
          </Col>

          <Col span={12} style={{padding: "10px"}} offset={1}>
            <Col span={22}>
              <AddQuestion reloadPoint={this.props.reloadPoint} getListMyQuestion={this.getListAllQuestion}/>
            </Col>
            <Col span={22}>
              {this.state.listQuestion.map(question => (
                <Row style={{marginTop: "10px"}} key={question.PostId}>
                  <Question reloadPoint={this.props.reloadPoint} question={question}
                            getListMyQuestion={this.getListAllQuestion}/>
                </Row>
              ))}
            </Col>
          </Col>

          <Col span={5} offset={1}>
            <Row style={{margin: '20px'}}>
              <XepHang/>
            </Row>
            <Row style={{margin: '20px'}}>
              <ThongKe/>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

Home.propTypes = {};


export default Home;
