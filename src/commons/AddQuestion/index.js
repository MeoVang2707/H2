import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Select, Input, Button } from 'antd';

import {listMonHoc} from "../../utils/constant";
import {addQuestion} from '../../services/apis/UserService';
import ShowModal from '../Modal'

import './style.css'

const { TextArea } = Input;
const Option = Select.Option;

/* eslint-disable react/prefer-stateless-function */
class AddQuestion extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      tabSelected: 'week',
      contentQuestion: null,
      typeQuestion: "Môn học",
      file: null,
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

  showModal = () => {
    ShowModal(100, this.onSubmitCauHoi);
  };

  onSubmitCauHoi = () => {
    const {contentQuestion, typeQuestion, file} = this.state;
    const formData = new FormData();
    formData.append('image',file);
    formData.append('Content', contentQuestion);
    formData.append('Theme', typeQuestion);
    if (!contentQuestion || typeQuestion==="Môn học"){
      alert('Empty Error');
    } else {
      addQuestion(formData)
        .then(res => {
          this.setState({
            contentQuestion: null,
            typeQuestion: "Môn học",
            file: null
          });
          this.fileInput.value = null;
          if (res.Status === 200){
            this.props.getListMyQuestion();
            this.props.reloadPoint();
            alert('Thành công');
          }
        })
        .catch(e => console.log(e));
    }
  };

  onChangeImage = e => {
    this.setState({
      file: e.target.files[0],
    });
  };

  renderImage = () => {
    const {file} = this.state;
    if (file){
      let x = URL.createObjectURL(file);
      return (
        <Row>
          <img
            src={x}
            style={{maxWidth: "100px"}}
            alt="Imagee"
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
    return null
  };

  onDeleteImage = () => {
    this.setState({
      file: null
    });
    this.fileInput.value = null;
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <TextArea
              autosize={{ minRows: 4}}
              placeholder="Nhập câu hỏi của bạn"
              onChange={this.onChangeCauHoi}
              value={this.state.contentQuestion}
            />
          </Col>
          <Col span={24}>
            <Row>
              <Select
                showSearch
                style={{ width: "20%", margin: "10px", marginLeft: 0 }}
                placeholder="Môn học"
                // optionFilterProp="children"
                value={this.state.typeQuestion}
                onChange={this.onChangeMonHoc}
                // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {listMonHoc.map(monHoc => (
                  <Option value={monHoc.id} key={monHoc.id}>{monHoc.name}</Option>
                ))}
              </Select>

              <input type="file" name="file" style={{display: "inline-block"}}
                     onChange={this.onChangeImage}
                     ref={ref => this.fileInput = ref}
              />

              <Button
                type="primary"
                style={{ width: "20%", margin: "10px"}}
                onClick={this.showModal}
              >
                Đăng
              </Button>
            </Row>
            <Row>
              {this.renderImage()}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

AddQuestion.propTypes = {
  getListMyQuestion: PropTypes.func,
};

export default AddQuestion;
