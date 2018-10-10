import React, { Fragment } from 'react';
import {
  MenuItem,
  Navbar,
  Nav,
  NavDropdown,
  NavItem,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import Login from './component/login/index';
import PropTypes from 'prop-types';
export default class AppHeader extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props, context) {
    super(props, context);

    this.state = {
      lgShow: false,
      isSearch: false,
      isLogin: false,
      isShownModal: false,
      username: null,
      titleBt: {
        myquestion: "Câu hỏi của tôi",
        latest: "Mới nhất",
        bestquestion: "Hỏi hay nhất"
      },
      title: "Hoihay.vn Hỏi đáp chất lượng cao"
    };
  }
  onLogin(username) {
    this.setState({ isLogin: true, isShownModal: false, username });
  }

  onLogoutBtnClick() {
    this.setState({ isLogin: false });
  }

  onOpenModal() {
    this.setState({ isShownModal: true });
  }

  onCloseModal() {
    this.setState({ isShownModal: false });
  }

  onClickCreatePost() {
    this.context.router.history.push('/lease');
  }
  onClickIconSearch(){

  }

  render() {
    const { isSearch, isLogin, isShownModal, username, titleBt, title } = this.state;
    // let isLogin = () => this.setState({ isLogin: false });
    return (
      <div>
        <Navbar collapseOnSelect className=' b-blue header '>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#brand">{title}
              </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem>
                <span className="span-latest b-green bd-green w-15" style={{ 'fontSize': '18px' }} onClick={() => this.onClickCreatePost()}> {titleBt.latest}</span>
              </NavItem>

              <NavItem>
                <span className="span-latest b-orange bd-orange w-15" style={{ 'fontSize': '18px' }} onClick={() => this.onClickCreatePost()}> {titleBt.bestquestion}</span>
              </NavItem>

              <NavItem>
                <span className="span-myquestion bd-while b-while" style={{ 'fontSize': '18px' }} onClick={() => this.onClickCreatePost()}> {titleBt.myquestion}</span>
              </NavItem>
              <Navbar.Form pullLeft>
                    <FormGroup>
                      <FormControl type="text" placeholder="Tìm kiếm gì đó " />
                    </FormGroup>{' '}
                    <Button type="submit"> <span><i className="fa fa-search" style={{ 'fontSize': '18px' }}></i> </span></Button>
                  
                  </Navbar.Form> 
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