import React  from 'react';
// import {
//   MenuItem,
//   Navbar,
//   Nav,
//   NavDropdown,
//   NavItem,
//   Button
// } from 'react-bootstrap';
import {Row, Col, Menu, Dropdown, Icon} from 'antd';

import Login from './component/login/index';
import PropTypes from 'prop-types';
import {getStorage, clear} from '../../services/StorageService'
import { Link } from 'react-router-dom';
import imgSearch from "../Header/images/seach.png";
import imgAva from "../Header/images/ava.jpg";

export default class AppHeader extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      lgShow: false,
      isSearch: false,
      token: getStorage('authorization'),
      isShownModal: false,
      username: getStorage('username'),
      // point: getStorage('point'),
      titleBt: {
        myquestion: "Câu hỏi của tôi",
        latest: "Mới nhất",
        bestquestion: "Hỏi hay nhất"
      },
      title: "Hỏi đáp chất lượng cao"
    };
  }
  onLogin(username) {
    this.setState({ token: getStorage('authorization'), isShownModal: false, username });
    this.props.reloadPoint();
  }

  onLogoutBtnClick() {
    const {reloadHomePage} =  this.props;
    clear('authorization');
    clear('username');
    clear('UserID');
    this.setState({ token: null});
    this.context.router.history.push(`/`);
    if (reloadHomePage){
      return reloadHomePage();
    }
  }

  onOpenModal() {
    this.setState({ isShownModal: true });
  }

  onCloseModal() {
    this.setState({ isShownModal: false });
  }

  render() {
    const { token, isShownModal, username } = this.state;
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="/#">Hồ sơ</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="/#">Thưởng điểm</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="/#">Thông báo</a>
        </Menu.Item>
        <Menu.Item>
          <Link to="/" onClick={() => this.onLogoutBtnClick()}>
            Đăng xuất
          </Link>
        </Menu.Item>
      </Menu>
    );
    return (
      <div style={{position: "fixed", width: "100%", zIndex: 1000 }}>
        <Row className="header" type="flex" align="middle">
          <Col span={6}>
            <span className="webName">
              <Link to="/">
                Hoihay.vn
              </Link>
            </span>
            <span className="sologan">Hỏi đáp chất lượng cao</span>
          </Col>

          <Col span={3}>
            <button className="buttonMoiNhat" onClick={() => this.context.router.history.push('/')}>
              <span>Mới nhất</span>
            </button>
          </Col>

          <Col span={3}>
            <button className="buttonhoiHayNhat" onClick={() => this.context.router.history.push(`/top`)}>
              Hỏi hay nhất
            </button>
          </Col>

          <Col span={4}>
            <button className="buttonCauHoiCuaToi" onClick={() => this.context.router.history.push(`/profile`)}>
              Câu hỏi của tôi
            </button>
          </Col>

          <Col span={7} offset={1} className="userInfor" style={{paddingRight: "20px"}}>
            {
              token ?
                <Row type="flex" justify="end">
                  <img src={imgSearch} alt="search" />
                  <span className="numberHHC">{this.props.point} HHC</span>
                  <img src={imgAva} className="imgAva" alt="Avatar"/>
                  <Dropdown overlay={menu}>
                    <span className="ant-dropdown-link">
                      {username} <Icon type="down" style={{fontSize: '18px'}} />
                    </span>
                  </Dropdown>
                </Row>
                :
                <Row type="flex" justify="end">
                  <span onClick={() => this.onOpenModal()} className="ant-dropdown-link">
                    <i className="fa fa-sign-in" style={{ 'fontSize': '18px' }} /> Đăng nhập
                  </span>
                </Row>
            }
          </Col>

        </Row>
        <Login
          show={isShownModal}
          onHide={this.onCloseModal.bind(this)}
          onLogin={this.onLogin.bind(this)}
          reloadHomePage={this.props.reloadHomePage}
        />
      </div>
    )
  }
}
