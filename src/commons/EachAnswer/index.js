/**
 *
 * XepHang
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {deleteAnswer} from '../../services/apis/UserService'

import { Row, Col, Dropdown, Menu} from 'antd';
// import './style.css'
import imgAva from "../Question/images/ava.jpg";
/* eslint-disable react/prefer-stateless-function */
class EachAnswer extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      showTextEditQuestion: false,
    };
  }

  showTextEditQuestion = () => {
    this.setState({
      showTextEditQuestion: true
    })
  }

  hideTextEditQuestion = () => {
    this.setState({
      showTextEditQuestion: false
    })
  }

  onDeleteAnswer = () => {
    deleteAnswer(this.props.answer.AnswerId).then(
      res => {
        if (res.Status === 200){
          alert("thành công");
          this.props.deleteOneAnswer(this.props.answer)
        }
      }
    )
  }

  onEditAnswer = () => {

  }

  render() {
    const {answer} = this.props;
    const menuAnswerEdit = (
      <Menu>
        <Menu.Item key="0">
          <span onClick={this.onEditAnswer}>Edit</span>
        </Menu.Item>
        <Menu.Item key="1">
          <span onClick={this.onDeleteAnswer}>Delete</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Row type="flex" align="middle" style={{marginTop: "8px"}} >
        <Col span={2}>
          <img src={imgAva} className="imgAva" alt="Avaar"/>
        </Col>
        <Col
          span={21}
          onMouseEnter={this.showTextEditQuestion}
          onMouseLeave={this.hideTextEditQuestion}
        >
          <Col className="answerContainer" span={22}>
            <span className="authAnswer">{answer.User}</span>
            <span>{answer.Content}</span>
          </Col>
          {
            this.state.showTextEditQuestion ?
              <Col span={1} offset={1} className="textEditQuestion">
                <Dropdown overlay={menuAnswerEdit} trigger={['click']}>
                  <span className="textEdit">Edit</span>
                </Dropdown>
              </Col>
              :
              null
          }
        </Col>
      </Row>
    )

  }
}

EachAnswer.propTypes = {
  answer: PropTypes.object,
  deleteOneAnswer: PropTypes.func
};

export default EachAnswer;
