import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Select, Input, Button} from 'antd';

import {listMonHoc} from "../../utils/constant";
import {editQuestion} from '../../services/apis/UserService'
import './style.css'

const {TextArea} = Input;
const Option = Select.Option;


/* eslint-disable react/prefer-stateless-function */
class EditQuestion extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contentQuestion: this.props.content,
      typeQuestion: this.props.type,
      image: this.props.image
    };
  }

  onChangeMonHoc = value => {
    this.setState({
      typeQuestion: value
    })
  };

  onChangeCauHoi = e => {
    this.setState({
      contentQuestion: e.target.value
    })
  };

  onEditCauHoi = () => {
    const {contentQuestion, typeQuestion, image} = this.state;
    const formData = new FormData();
    formData.append('image', image);
    formData.append('Content', contentQuestion);
    formData.append('Theme', typeQuestion);
    formData.append('PostId', this.props.postId);
    if (!contentQuestion || !typeQuestion) {
      alert('Empty Error');
    } else {
      editQuestion(formData)
        .then(res => {
          this.setState({
            contentQuestion: null,
            typeQuestion: null,
            image: null
          });
          this.fileInput.value = null;
          if (res.Status === 200) {
            this.props.getInforQuestion();
            this.onExitEdit();
            alert('Thành công');
          }
        })
    }
  }

  onExitEdit = () => {
    this.props.onExitEdit();
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
    return (
      <div>
        <Row>
          <Col span={24}>
            <TextArea
              autosize={{minRows: 4}}
              placeholder="Nhập câu hỏi của bạn"
              onChange={this.onChangeCauHoi}
              value={this.state.contentQuestion}
            />
          </Col>
          <Col span={24}>
            <Row>
              <Select
                showSearch
                style={{width: "20%", margin: "10px", marginLeft: 0}}
                placeholder="Chọn môn học"
                optionFilterProp="children"
                value={this.state.typeQuestion}
                onChange={this.onChangeMonHoc}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {listMonHoc.map(monHoc => (
                  <Option value={monHoc.id} key={monHoc.id}>{monHoc.name}</Option>
                ))}
              </Select>

              <input type="file" name="file" style={{display: "inline-block"}}
                     onChange={this.onChangeImage}
                     ref={ref => this.fileInput = ref}
              />
            </Row>

            {this.renderImage()}

            <Row>
              <Button
                type="primary"
                style={{width: "20%", margin: "10px 0px"}}
                onClick={this.onEditCauHoi}
              >
                Sửa
              </Button>

              <Button
                type="primary"
                style={{width: "20%", margin: "10px"}}
                onClick={this.onExitEdit}
              >
                Hủy
              </Button>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

EditQuestion.propTypes = {
  getInforQuestion: PropTypes.func,
  content: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string,
  postId: PropTypes.string,
  onExitEdit: PropTypes.func
};

export default EditQuestion;
