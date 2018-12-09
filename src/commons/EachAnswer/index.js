/**
 *
 * XepHang
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Dropdown, Menu, Button, Input} from 'antd';

import {deleteAnswer, editAnswer} from '../../services/apis/UserService'
import {getStorage} from '../../services/StorageService';

// import './style.css'
import imgAva from "../Question/images/ava.jpg";
/* eslint-disable react/prefer-stateless-function */
class EachAnswer extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      showTextEditQuestion: false,
      showFormEditAnswer: false,
      editAnswer: this.props.answer.Content,
      userId: getStorage('userId')
    };
  }

  showTextEditQuestion = () => {
    if (this.state.userId === this.props.answer.UserId){
      this.setState({
        showTextEditQuestion: true
      })
    }
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
          // this.props.deleteOneAnswer(this.props.answer)
          this.props.getInforQuestion()
        }
      }
    )
  }

  onEditAnswer = () => {
    this.setState({
      showFormEditAnswer: true
    })
  }

  onExitEdit = () => {
    this.setState({
      showFormEditAnswer: false
    })
  }

  onChangeAnswer = (e) => {
    this.setState({
      editAnswer: e.target.value
    })
  }

  onEditAnswerAPI = () => {
    if (this.state.editAnswer){
      editAnswer(this.props.answer.AnswerId, this.state.editAnswer).then(
        res => {
          if (res.Status === 200){
            this.props.getInforQuestion();
            this.onExitEdit();
          }
        }
      )
    }

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
        {
          this.state.showFormEditAnswer
            ?
            <Row>
              <Col span={24}>
                <Input
                  className="input"
                  onChange={this.onChangeAnswer}
                  value={this.state.editAnswer}
                />
              </Col>
              <Col span={24}>
                <Row>
                  <Button
                    type="primary"
                    style={{ width: "20%", margin: "10px"}}
                    onClick={this.onEditAnswerAPI}
                  >
                    Sửa
                  </Button>

                  <Button
                    type="primary"
                    style={{ width: "20%", margin: "10px"}}
                    onClick={this.onExitEdit}
                  >
                    Hủy
                  </Button>
                </Row>
              </Col>
            </Row>
            :
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
        }

      </Row>
    )

  }
}

EachAnswer.propTypes = {
  answer: PropTypes.object,
  deleteOneAnswer: PropTypes.func,
  getInforQuestion: PropTypes.func
};

export default EachAnswer;
