/**
 *
 * XepHang
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Dropdown, Menu, Button, Input} from 'antd';

import {deleteComment, editComment} from '../../services/apis/UserService'
import {getStorage} from '../../services/StorageService';

// import './style.css'
import imgAva from "../Question/images/ava.jpg";
/* eslint-disable react/prefer-stateless-function */
class EachComment extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      showTextEditQuestion: false,
      showFormEditComment: false,
      editComment: this.props.comment.Content,
      userId: getStorage('userId'),
      showComment: false
    };
  }

  showTextEditQuestion = () => {
    if (this.state.userId === this.props.comment.UserId){
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

  onDeleteComment = () => {
    deleteComment(this.props.comment.CommentId).then(
      res => {
        if (res.Status === 200){
          alert("thành công");
          // this.props.deleteOneComment(this.props.answer)
          this.props.getInforQuestion()
        } else {
          alert('Error')
        }
      }
    )
  };

  onEditComment = () => {
    this.setState({
      showFormEditComment: true
    })
  };

  onExitEdit = () => {
    this.setState({
      showFormEditComment: false
    })
  };

  onChangeComment = (e) => {
    this.setState({
      editComment: e.target.value
    })
  };

  onEditCommentAPI = () => {
    if (this.state.editComment){
      editComment(this.props.comment.CommentId, this.state.editComment).then(
        res => {
          if (res.Status === 200){
            this.props.getInforQuestion();
            this.onExitEdit();
          }
        }
      )
    }
  };
  
  render() {
    const {comment} = this.props;
    const menuCommentEdit = (
      <Menu>
        <Menu.Item key="0">
          <span onClick={this.onEditComment}>Edit</span>
        </Menu.Item>
        <Menu.Item key="1">
          <span onClick={this.onDeleteComment}>Delete</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Row type="flex" align="middle" style={{marginTop: "8px"}} >
        <Col span={2}>
          <img src={imgAva} className="imgAva" alt="Avaar"/>
        </Col>
        {
          this.state.showFormEditComment
            ?
            <Row>
              <Col span={24}>
                <Input
                  className="input"
                  onChange={this.onChangeComment}
                  value={this.state.editComment}
                />
              </Col>
              <Col span={24}>
                <Row>
                  <Button
                    type="primary"
                    style={{ width: "20%", margin: "10px"}}
                    onClick={this.onEditCommentAPI}
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
                  <span className="authAnswer">{comment.User}</span>
                  <span>{comment.Content}</span>
                </Col>
                {
                  this.state.showTextEditQuestion ?
                    <Col span={1} offset={1} className="textEditQuestion">
                      <Dropdown overlay={menuCommentEdit} trigger={['click']}>
                        <span className="textEdit">Edit</span>
                      </Dropdown>
                    </Col>
                    :
                    null
                }
              </Col>
            </Col>

        }
      </Row>
    )

  }
}

EachComment.propTypes = {
  comment: PropTypes.object,
  deleteOneComment: PropTypes.func,
  getInforQuestion: PropTypes.func
};

export default EachComment;
