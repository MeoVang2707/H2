import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Row, Col, Select, Input, Button} from 'antd';
import './style.css'
import {addQuestion} from '../../services/apis/UserService'

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
class AddQuestion extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      tabSelected: 'week',
      contentQuestion: null,
      typeQuestion: "Môn học",
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

  onSubmitCauHoi = () => {
    const {contentQuestion, typeQuestion} = this.state;
    if (!contentQuestion || typeQuestion==="Môn học"){
      alert('Empty Error');
    } else {
      addQuestion(contentQuestion, typeQuestion)
        .then(res => {
          this.setState({
            contentQuestion: null,
            typeQuestion: "Môn học"
          });
          if (res.Status === 200){
            this.props.getListMyQuestion();
            alert('Thành công');
          }
        })
    }
  }

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

              <Button
                type="primary"
                style={{ width: "20%", margin: "10px"}}
                onClick={this.onSubmitCauHoi}
              >
                Đăng
              </Button>
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
