import React from 'react';
import {Modal} from 'react-bootstrap'
import PropTypes from 'prop-types';
import {getProfile, login} from '../../../../services/apis/UserService';
import {set} from '../../../../services/StorageService';

export default class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: 'thinh@gmail.com',
      password: 'hello'
    };
    this.onLoginBtnClick = this.onLoginBtnClick.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  onChangeInput(e) {
    const newValue = e.target.value;
    const name = e.target.name;
    this.setState({[name]: newValue});
  }

  onLoginBtnClick = () => {
    const {username, password} = this.state;
    if (!username || !password){
      alert('Tên đăng nhập và mật khẩu không được để trống');
    } else {
      login(username, password)
        .then(res => {
          if (res.Status === 200){
            set('authorization', res.Token);
            set('username', username);
            set('userId', res.UserId);
            this.getProfile(username);
          } else {
            alert("Tên đăng nhập và mật khẩu không đúng")
          }
        })
        .catch(e => {
          alert("Something went wrong")
        });
    }
  };

  getProfile = (username) => {
    getProfile().then(
      res => {
        if (res.Status === 200) {
          set('point', res.User.point);
          this.props.onLogin(username);
          this.props.reloadHomePage();
        }
      }
    )
  }

  render() {
    const {show} = this.props;
    // Render nothing if the "show" prop is false
    return (
      <Modal
        show={show}
        onHide={this.props.onHide}
        aria-labelledby="contained-modal-title"
        id="loginModal"
      >
        <Modal.Body>

          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h2>Đăng nhập thành viên</h2>
                <p>Vui lòng nhập tên đăng nhập và mật khẩu của bạn</p>
              </div>
              <form id="Login">
                <div className="form-group">
                  <input type="text"
                         className="form-control"
                         name="username"
                         value={this.state.username}
                         placeholder="Tên đăng nhập"
                         onChange={this.onChangeInput}
                  />
                </div>

                <div className="form-group">
                  <input type="password"
                         className="form-control"
                         name="password"
                         value={this.state.password}
                         placeholder="mật khẩu"
                         onChange={this.onChangeInput}
                  />
                </div>
                <div className="forgot">
                  <a href="/#">Quên mật khẩu?</a>
                  <a href="/#" className="register">Đăng ký?</a>
                </div>
                <button type="button" className="btn btn-primary" onClick={this.onLoginBtnClick}>Đăng nhập</button>
                <div className="fb-gg">

                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
                    <Button bsStyle='primary' onClick={this.onLoginBtnClick}>Login</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer> */}
      </Modal>
    );
  }
}