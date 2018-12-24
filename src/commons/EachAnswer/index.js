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
      image: this.props.answer.Image,
      imageComment: null
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
      const formData = new FormData();
      formData.append('image', this.state.image);
      formData.append('Content', this.state.editAnswer);
      formData.append('AnswerId', this.props.answer.AnswerId);
      editAnswer(formData).then(
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
        <Row>
          <input
            type="file"
            name="file"
            style={{
             display: "inline-block",
             margin: "10px"
            }}
            onChange={this.onChangeImageComment}
            ref={ref => this.fileInputComment = ref}
          />
        </Row>
        {this.renderImageComment()}
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
        const formData = new FormData();
        formData.append('image',this.state.imageComment);
        formData.append('Content', this.state.newComment);
        formData.append('AnswerId', this.props.answer.AnswerId);
        addComment(formData).then(
          res => {
            if (res.Status === 200) {
              this.setState(() => ({
                newComment: null,
                imageComment: null
              }));
              this.fileInputComment.value = null;
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
  };

  onVote = () => {
    voteAnswer(this.props.answer.AnswerId).then(res => {
      if (res.Status === 200){
        this.props.getInforQuestion();
      } else {
        if (res.Status === 500){
          alert('Bạn không thể tự vote cho chính mình')
        }
      }
    }).catch(e => console.log(e));
  };

  onChangeImage = e => {
    this.setState({
      image: e.target.files[0],
    });
  };

  onDeleteImage = () => {
    this.setState({
      image: null
    });
    this.fileInput.value = null;
  };

  renderImage = () => {
    const {image} = this.state;
    if (image){
      if (typeof(image) === "string"){
        return (
          <Row>
            <img
              src={"https://frozen-garden-23187.herokuapp.com/api/question/getImage?image_name=" + this.state.image}
              style={{width: "100px"}}
              alt="Image"
            />

            <Button
              type="primary"
              style={{width: "20%", margin: "10px 30px"}}
              onClick={this.onDeleteImage}
            >
              Xóa ảnh
            </Button>

          </Row>
        )
      } else {
        let x = URL.createObjectURL(image);
        return (
          <Row>
            <img
              src={x}
              style={{width: "100px"}}
              alt="Image"
            />

            <Button
              type="primary"
              style={{width: "20%", margin: "10px 30px"}}
              onClick={this.onDeleteImage}
            >
              Xóa ảnh
            </Button>

          </Row>
        )
      }
    }
    return null
  };

  onChangeImageComment = e => {
    this.setState({
      imageComment: e.target.files[0],
    });
  };

  renderImageComment = () => {
    const {imageComment} = this.state;
    if (imageComment){
      let x = URL.createObjectURL(imageComment);
      return (
        <Row>
          <img
            src={x}
            style={{maxWidth: "100px"}}
            alt="Image"
          />
          <Button
            type="primary"
            style={{width: "20%", margin: "10px 30px"}}
            onClick={this.onDeleteImageComment}
          >
            Xóa ảnh
          </Button>
        </Row>
      )
    }
    return null
  };

  onDeleteImageComment = () => {
    this.setState({
      imageComment: null
    });
    this.fileInputComment.value = null;
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
            <Col span={22}>
              <Col span={20}>
                <Input
                  className="input"
                  onChange={this.onChangeAnswer}
                  value={this.state.editAnswer}
                />
              </Col>
              <Col span={20}>
                <input type="file" name="file"
                       style={{
                         display: "inline-block",
                         marginTop: "5px"
                       }}
                       onChange={this.onChangeImage}
                       ref={ref => this.fileInput = ref}
                />
              </Col>
              <Col span={20}>
                {this.renderImage()}
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
            </Col>
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
                  <Col span={24}>
                    {
                      answer.Image ?
                        <img
                          src={"https://frozen-garden-23187.herokuapp.com/api/question/getImage?image_name=" + answer.Image}
                          style={{maxWidth: "100px", marginTop: "5px"}}
                          alt="Image"
                        />
                        : null
                    }
                  </Col>
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
