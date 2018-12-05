/**
 *
 * Question
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {Input, Row, Col, Dropdown, Menu, Divider} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';

import imgAva from './images/ava.jpg';
import imgLike from './images/like.png';
import imgLiked from './images/liked.png';
import imgShare from './images/share.png';
import imgComment from './images/Comment.png';
import "./style.css";

const menuEdit = (
  <Menu>
    <Menu.Item key="0">
      <a>Edit</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a>Delete</a>
    </Menu.Item>
  </Menu>
);

/* eslint-disable react/prefer-stateless-function */
class Question extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      liked: false,
      listAnswers: []
    };
    this.onXemThem = this.onXemThem.bind(this);
  }

  onToggleLike = () => {
    this.setState(state => ({
      liked: !state.liked,
    }));
  };

  componentDidMount(){
    const answers = this.props.question.answers;
    if (answers.length > 3){
      this.setState({
        listAnswers: answers.slice(0,3)
      });
    } else {
      this.setState({
        listAnswers: answers
      });
    }
  }

  renderAnswer = answers => {
    if (this.state.listAnswers.length === 0) {
      return null
    }
    const x =
      <div>
        <Divider style={{marginBottom: "2px", marginTop: "15px"}} />
        {
          this.state.listAnswers.map((answer,index) => (
            <Row type="flex" align="middle" style={{marginTop: "8px"}} key={index}>
              <Col span={2}>
                <img src={imgAva} className="imgAva" />
              </Col>
              <Col span={21} >
                <div className="answerContainer">
                  <span className="authAnswer">{answer.User}</span>
                  <span>{answer.Content}</span>
                </div>
              </Col>
            </Row>
          ))
        }

        {
          this.state.listAnswers.length >= answers.length ? null :
            <span className="textEdit" onClick={() => this.onXemThem(answers)}>Xem Thêm</span>
        }
      </div>
    return x
  };

  onXemThem = (answers) => {
    this.setState({
      listAnswers: answers
    });
  };

  render() {
    const {question} = this.props;
    return (
      <div className="question">
        <Row type="flex" align="middle">
          <Col span={3}>
            <img src={imgAva} className="imgAvaQuestion"/>
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
        <Row style={{marginTop: "10px", marginBottom: "10px"}}>
          <span style={{fontSize:"18px", color:"#000000"}}>
            {question.information.Content}
          </span>
        </Row>
        <Row type="flex" align="middle" style={{marginBottom: '20px'}}>
          <Col span={4}>
            <Row type="flex" justify="space-between">
              <img src={this.state.liked ? imgLiked : imgLike} onClick={this.onToggleLike}/>
              <img src={imgShare} />
              <img src={imgComment} />
            </Row>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={2}>
            <img src={imgAva} className="imgAva" />
          </Col>
          <Col span={21}>
            <Input placeholder="Trả lời hay nhận quà ngay" className="input"/>
          </Col>
        </Row>

        {this.renderAnswer(question.answers)}
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object,
};

export default Question;
