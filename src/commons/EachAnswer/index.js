/**
 *
 * XepHang
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Dropdown, Menu, Button, Input} from 'antd';

import {addComment, deleteAnswer, editAnswer, voteAnswer} from '../../services/apis/UserService'
import {getStorage} from '../../services/StorageService';
import EachComment from '../EachComment'
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
      userId: getStorage('userId'),
      showComment: false,
      newComment: null,
    };
  }

  showTextEditQuestion = () => {
    if (this.state.userId === this.props.answer.UserId){
      this.setState({
        showTextEditQuestion: true
      })
    }
  };

  hideTextEditQuestion = () => {
    this.setState({
      showTextEditQuestion: false
    })
  };

  onDeleteAnswer = () => {
    deleteAnswer(this.props.answer.AnswerId).then(
      res => {
        if (res.Status === 200){
          alert("thành công");
          this.props.getInforQuestion()
        }
      }
    )
  };

  onEditAnswer = () => {
    this.setState({
      showFormEditAnswer: true
    })
  };

  onExitEdit = () => {
    this.setState({
      showFormEditAnswer: false
    })
  };

  onChangeAnswer = (e) => {
    this.setState({
      editAnswer: e.target.value
    })
  };

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
  };

  renderListComment = () => {
    const listComment= this.props.answer.Comment;
    return (
      <Row>
        {
          listComment.map(comment => (
            <EachComment
              comment={comment}
              key={comment.CommentId}
              getInforQuestion={this.props.getInforQuestion}
            />
          ))
        }
      </Row>
    );
  };

  renderComment = () => {
    return this.state.showComment && (
      <Col span={22} offset={2} style={{marginBottom: "5px"}}>
        {this.renderListComment()}
        <Row type="flex" align="middle" style={{marginTop: "8px"}}>
          <Col span={2}>
            <img src={imgAva} className="imgAva" alt="Avaar" />
          </Col>
          <Col span={21}>
            <Input
              placeholder="Trả lời hay nhận quà ngay"
              className="input"
              onKeyPress={this.onAddComment}
              onChange={this.onChangeComment}
              value={this.state.newComment}
            />
          </Col>
        </Row>
      </Col>
    )
  };

  onChangeComment = (e) => {
    this.setState({
      newComment: e.target.value
    })
  };

  onAddComment = (event) => {
    if(event.key === 'Enter'){
      if (this.state.newComment){
        addComment(this.state.newComment, this.props.answer.AnswerId).then(
          res => {
            console.log('res', res);
            if (res.Status === 200) {
              this.setState(() => ({
                newComment: null,
              }));
              this.props.getInforQuestion();
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
  };

  onToggleShowComment = () => {
    this.setState(state => ({
      showComment: !state.showComment,
    }));
  };

  renderButtonVote = () => {
    if(this.props.voted){
      if (this.props.answer.Rated === 1){
        return (<span style={{margin: "0 10px 0 3px", fontWeight: "bold", color: "#0074D9"}}>Voted</span>)
      } else {
        return (<span style={{margin: "0 10px 0 3px"}}>Vote</span>)
      }
    } else {
      return (
        <span
          className="textEdit"
          style={{margin: "0 10px 0 3px"}}
          onClick={this.onVote}
        >
            Vote
          </span>
      )
    }
  }

  onVote = () => {
    voteAnswer(this.props.answer.AnswerId).then(res => {
      if (res.Status === 200){
        this.props.getInforQuestion();
      } else {
        if (res.Status === 500){
          alert('Bạn không thể tự vote cho chính mình')
        }
      }
    }).catch(() => alert('Tài khoản đã bị truy cập ở một nơi khác. Đăng nhập lại để tiếp tục'));
  };
  
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
            <Col span={22}>
              <Col
                span={22}
                onMouseEnter={this.showTextEditQuestion}
                onMouseLeave={this.hideTextEditQuestion}
              >
                <Col className="answerContainer" span={22} style={{padding: "10px 20px"}}>
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
              <Col span={12} offset={1}>
                <p style={{margin:0}}>
                  {answer.Vote}
                  {this.renderButtonVote()}
                  <span className="textEdit" onClick={this.onToggleShowComment}> Comment</span>
                </p>
              </Col>
            </Col>

        }
        {this.renderComment()}
      </Row>
    )

  }
}

EachAnswer.propTypes = {
  answer: PropTypes.object,
  deleteOneAnswer: PropTypes.func,
  getInforQuestion: PropTypes.func,
  voted: PropTypes.bool,
};

export default EachAnswer;
