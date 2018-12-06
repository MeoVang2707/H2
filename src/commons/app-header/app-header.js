import React  from 'react';
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
import {getStorage, clear} from '../../services/StorageService'
import { Link } from 'react-router-dom';

export default class AppHeader extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      lgShow: false,
      isSearch: false,
      isLogin: getStorage('authorization'),
      isShownModal: false,
      username: getStorage('username'),
      titleBt: {
        myquestion: "Câu hỏi của tôi",
        latest: "Mới nhất",
        bestquestion: "Hỏi hay nhất"
      },
      title: "Hỏi đáp chất lượng cao"
    };
  }
  onLogin(username) {
    this.setState({ isLogin: true, isShownModal: false, username });
  }

  onLogoutBtnClick() {
    // this.setState({ isLogin: false });
    clear('authorization');
    this.setState({ isLogin: false})
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
    const { isLogin, isShownModal, username, titleBt, title } = this.state;
    // let isLogin = () => this.setState({ isLogin: false });
    return (
      <div>
        <Navbar collapseOnSelect className=' b-blue header '>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#brand">{title}
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight >
            <li style={{width: '160px', padding: '8px'}}><button  className='btn btn-success btn-block'>{titleBt.latest}</button></li>
            <li style={{width: '160px', padding: '8px'}}><button  className='btn btn-danger btn-block'>{titleBt.bestquestion}</button></li>
            <li style={{width: '160px', padding: '8px'}}>
              <Link to='/profile' style={{padding: 0}}>
                <button  className='btn btn-default btn-block'>
                  {titleBt.myquestion}
                </button>
              </Link>
            </li>
              {/* <NavItem>
                <span className="span-latest b-green bd-green" style={{ 'fontSize': '18px' }} onClick={() => this.onClickCreatePost()}> {titleBt.latest}</span>
              </NavItem>

              <NavItem>
                <span className="span-latest b-orange bd-orange" style={{ 'fontSize': '18px' }} onClick={() => this.onClickCreatePost()}> {titleBt.bestquestion}</span>
              </NavItem>

              <NavItem>
                <span className="span-myquestion bd-while b-while" style={{ 'fontSize': '18px' }} onClick={() => this.onClickCreatePost()}> {titleBt.myquestion}</span>
              </NavItem> */}
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
                    <MenuItem onClick={() => this.onLogoutBtnClick()}>
                      <Link href='/' to='/' style={{padding: 0}}>
                        Đăng xuất
                      </Link>
                    </MenuItem>
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