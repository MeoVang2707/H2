import React, { Fragment } from 'react';
import {
  MenuItem,
  Navbar,
  Nav,
  NavDropdown,
  NavItem
} from 'react-bootstrap';
import Login from './component/login/index';
import PropTypes from 'prop-types';
import {Redirect,Link} from 'react-router-dom';
export default class AppHeader extends React.Component {
  static contextTypes = {
    router: PropTypes.object
}
  constructor(props, context) {
    super(props, context);

    this.state = {
      lgShow: false,
      isLogin : false,
      isShownModal: false,
      username: null
    };
  }
  onLogin(username) {
    this.setState({isLogin: true, isShownModal: false, username});
  }

  onLogoutBtnClick() {
    this.setState({isLogin: false});
  }

  onOpenModal() {
    this.setState({isShownModal: true});
  }

  onCloseModal() {
    this.setState({isShownModal: false});
  }

  onClickCreatePost() {
    this.context.router.history.push('/lease');
  }

  render() {
    const {isLogin, isShownModal, username} = this.state;
    // let isLogin = () => this.setState({ isLogin: false });
    return (
      <div>
      <Navbar collapseOnSelect className=' header'>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">Hỏi đáp</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem>
              <i className="fa fa-comments-o" style={{ 'fontSize': '18px' }}></i> Thư đến
            </NavItem>

            <NavItem>
              <i className="fa fa-search" style={{ 'fontSize': '18px' }}></i> Tìm kiếm
            </NavItem>

            <NavItem>
              <i className="fa fa-plus c-a-create" style={{ 'fontSize': '18px' }} onClick={() => this.onClickCreatePost()}> Câu hỏi mới</i>
            </NavItem>
            {
              isLogin ?
              <NavDropdown
                title={<span><i className="fa fa-user fa-fw" style={{ 'fontSize': '18px' }}></i> {username}</span>}
                id="basic-nav-dropdown"
              >
                <MenuItem>Dashboard</MenuItem>
                <MenuItem>Inbox</MenuItem>
                <MenuItem>Edit profile</MenuItem>
                <MenuItem divider />
                <MenuItem onClick={() => this.onLogoutBtnClick()}>Đăng xuất</MenuItem>
              </NavDropdown>
              :
              <NavItem onClick={() => this.onOpenModal()}>
                <i className="fa fa-sign-in" style={{ 'fontSize': '18px' }}></i> Đăng nhập
              </NavItem>
            }
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Login show={isShownModal} onHide={this.onCloseModal.bind(this)} onLogin={this.onLogin.bind(this)} />
      </div>
    )
  }
}