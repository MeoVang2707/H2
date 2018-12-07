/**
 *
 * Question
 *
 */

import React from 'react';
// import styled from 'styled-components';
import {Input, Row, Col, Dropdown, Menu, Divider} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import {deleteQuestion, addAnswer} from '../../services/apis/UserService'

import EditQuestion from '../EditQuestion'
import EachAnswer from '../EachAnswer'
import imgAva from './images/ava.jpg';
import imgLike from './images/like.png';
import imgLiked from './images/liked.png';
import imgShare from './images/share.png';
import imgComment from './images/Comment.png';
import "./style.scss";

/* eslint-disable react/prefer-stateless-function */
class Question extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      edited: false,
      liked: false,
      listAnswers: [],
      newAnswer: null,
      pureListAnswer: this.props.question.answers
    };
    this.onXemThem = this.onXemThem.bind(this);
    this.onHideQuestion = this.onHideQuestion.bind(this);
    this.onExitEdit = this.onExitEdit.bind(this);
    this.renderAnswer = this.renderAnswer.bind(this);
    this.onAddAnswer = this.onAddAnswer.bind(this);
    this.deleteOneAnswer = this.deleteOneAnswer.bind(this);
  }

  onToggleLike = () => {
    this.setState(state => ({
      liked: !state.liked,
    }));
  };

  componentDidMount(){
    const answers = this.state.pureListAnswer;
    if (answers.length > 3){
      this.onHideQuestion(answers)
    } else {
      this.onXemThem(answers)
    }
  }

  renderAnswer = () => {
    const answers = this.state.pureListAnswer
    if (this.state.listAnswers.length === 0) {
      return null
    }
    const x =
      <div>
        <Divider style={{marginBottom: "2px", marginTop: "15px"}} />
        {
          this.state.listAnswers.map(answer => (
            <EachAnswer answer={answer}
                        deleteOneAnswer={answer => this.deleteOneAnswer(answer)}
                        getListMyQuestion={this.props.getListMyQuestion}
                        key={answer.AnswerId}
            />
          ))
        }

        {
          this.state.listAnswers.length >= answers.length ? null :
            <span className="textEdit" onClick={() => this.onXemThem()}>Xem Thêm</span>
        }

        {
          this.state.listAnswers.length < answers.length || answers.length <= 3 ? null :
            <span className="textEdit" onClick={() => this.onHideQuestion()}>Ẩn</span>
        }
      </div>
    return x
  };

  onHideQuestion = () => {

    this.setState({
      listAnswers: this.state.pureListAnswer.slice(0,3)
    });
  };

  onXemThem = () => {
    this.setState({
      listAnswers: this.state.pureListAnswer
    });
  };

  onDeleteQuestion = () => {
    deleteQuestion(this.props.question.PostId).then(
      res => {
        if (res.Status === 200){
          this.props.getListMyQuestion();
          alert('Thành công');
        }
      }
    )
  }

  onEdit = () => {
    this.setState({
      edited: true
    })
  }

  onAddAnswer = (event) => {
    if(event.key === 'Enter'){
      if (this.state.newAnswer){
        addAnswer(this.state.newAnswer, this.props.question.PostId).then(
          res => {
            if (res.Status === 200) {
              this.setState(state => ({
                newAnswer: null,
                listAnswers: [res.answer, ...state.listAnswers]
              }))
            }
            else {
              alert("Error")
            }
          }
        )
      } else {
        alert('Input error')
      }
    }
  }

  onChangeAnswer = (e) => {
    this.setState({
      newAnswer: e.target.value
    })
  }

  onExitEdit = () => {
    this.setState({
      edited: false
    })
  }

  deleteOneAnswer = (answer) => {
    const x = [...this.state.listAnswers];
    const y = [...this.state.pureListAnswer];
    const index = x.indexOf(answer);
    if (index >= 0){
      x.splice(index, 1);
      y.splice(index, 1);
      this.setState({
        listAnswers: x,
        pureListAnswer: y
      })
    }
  }

  render() {
    const {question} = this.props;
    const menuEdit = (
      <Menu>
        <Menu.Item key="0">
          <span onClick={this.onEdit}>Edit</span>
        </Menu.Item>
        <Menu.Item key="1">
          <span onClick={this.onDeleteQuestion}>Delete</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="question">
        <Row type="flex" align="middle">
          <Col span={3}>
            <img src={imgAva} className="imgAvaQuestion" alt="Avaar"/>
          </Col>
          <Col span = {20}>
            <Row style={{color:"#1D4077", fontWeight:"bold"}}>Trần Trung Hiếu</Row>
            <Row style={{color:"#8C8C8C"}}>
              { moment.utc(question.UpdatedDate).format('DD MM YYYY, HH:mm:ss')}
            </Row>
          </Col>
          <Col span={1}>
            <Dropdown overlay={menuEdit} trigger={['click']}>
              <span className="textEdit">Edit</span>
            </Dropdown>
          </Col>
        </Row>
        {
          this.state.edited ?
            <EditQuestion
              content={question.information.Content}
              type={question.Theme}
              postId={question.PostId}
              getListMyQuestion={this.props.getListMyQuestion}
              onExitEdit={this.onExitEdit}
            />
            :
            <Row style={{marginTop: "10px", marginBottom: "10px"}}>
              <span style={{fontSize:"18px", color:"#000000"}}>
                {question.information.Content}
              </span>
            </Row>
        }
        <Row type="flex" align="middle" style={{marginBottom: '20px'}}>
          <Col span={4}>
            <Row type="flex" justify="space-between">
              <img src={this.state.liked ? imgLiked : imgLike} onClick={this.onToggleLike} alt="Like"/>
              <img src={imgShare} alt="Share"/>
              <img src={imgComment} alt="Comment"/>
            </Row>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={2}>
            <img src={imgAva} className="imgAva" alt="Avaar" />
          </Col>
          <Col span={21}>
            <Input
              placeholder="Trả lời hay nhận quà ngay"
              className="input"
              onKeyPress={this.onAddAnswer}
              onChange={this.onChangeAnswer}
              value={this.state.newAnswer}
            />
          </Col>
        </Row>

        {this.renderAnswer()}
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object,
  getListMyQuestion: PropTypes.func,
};

export default Question;
