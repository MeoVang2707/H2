import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Row, Col, Select, Input, Button} from 'antd';
import './style.css'
import {editQuestion} from '../../services/apis/UserService'

const { TextArea } = Input;
const Option = Select.Option;
const listMonHoc=[
  {
    name: 'Toán',
    id: 'toan'
  },
  {
    name: 'Vật lý',
    id: 'vatLy'
  },
  {
    name: 'Hóa học',
    id: 'hoaHoc'
  },
  {
    name: 'Sinh học',
    id: 'sinhHoc'
  },
  {
    name: 'Văn học',
    id: 'vanHoc'
  },
  {
    name: 'Tiếng Anh',
    id: 'tiengAnh'
  },
  {
    name: 'Địa lý',
    id: 'diaLy'
  },
  {
    name: 'Lịch sử',
    id: 'lichSu'
  },
];


/* eslint-disable react/prefer-stateless-function */
class EditQuestion extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      tabSelected: 'week',
      contentQuestion: this.props.content,
      typeQuestion: this.props.type
    };
  }

  onChangeMonHoc = value => {
    this.setState({
      typeQuestion: value
    })
  }

  onChangeCauHoi = e => {
    this.setState({
      contentQuestion: e.target.value
    })
  };

  onEditCauHoi = () => {
    const {contentQuestion, typeQuestion} = this.state;
    if (!contentQuestion || !typeQuestion){
      alert('Empty Error');
    } else {
      editQuestion(contentQuestion, typeQuestion, this.props.postId)
        .then(res => {
          // this.setState({
          //   contentQuestion: null,
          //   typeQuestion: null
          // });
          console.log(res);
          if (res.Status === 200){
            this.props.getListMyQuestion();
            this.onExitEdit();
            alert('Thành công');
          }
        })
    }
  }

  onExitEdit = () => {
    this.props.onExitEdit();
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

              <Button
                type="primary"
                style={{ width: "20%", margin: "10px"}}
                onClick={this.onEditCauHoi}
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
      </div>
    );
  }
}

EditQuestion.propTypes = {
  getListMyQuestion: PropTypes.func,
  content: PropTypes.string,
  type: PropTypes.string,
  postId: PropTypes.string,
  onExitEdit: PropTypes.func
};

export default EditQuestion;
