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
      showComment: false,
      image: this.props.comment.Image,
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
          alert(res.Message)
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
      const formData = new FormData();
      formData.append('image', this.state.image);
      formData.append('Content', this.state.editComment);
      formData.append('CommentId', this.props.comment.CommentId);
      editComment(formData).then(
        res => {
          if (res.Status === 200){
            this.fileInput.value = null;
            this.props.getInforQuestion();
            this.onExitEdit();
          }
        }
      )
    }
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
            <Col span={22}>
              <Col span={24}>
                <Input
                  className="input"
                  onChange={this.onChangeComment}
                  value={this.state.editComment}
                />
              </Col>

              <Col span={20}>
                <input
                  type="file"
                  name="file"
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
            </Col>
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
                  <Col span={24}>
                    {
                      comment.Image ?
                        <img
                          src={"https://frozen-garden-23187.herokuapp.com/api/question/getImage?image_name=" + comment.Image}
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
