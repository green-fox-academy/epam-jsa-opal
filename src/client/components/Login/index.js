import React from 'react';
import './index.scss';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      usernamePass: true,
      passwordPass: true,
      errorMessage: '',
      loginStatus: 'notLogin',
    };
  }
  onSubmit(ev) {
    ev.preventDefault();
    let email = ev.target.elements.namedItem('email').value;
    let password = ev.target.elements.namedItem('password').value;
    let statusCode;
    let obj = {
      username: email,
      password: password,
    };
    this.setState({'loginStatus': 'logining'});
    fetch('/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then((response) => {
      statusCode = response.status;
      return response.json();
    }).then((reslut) => {
      let errorMessage;
      if (statusCode === 200) {
        // stroe token
        localStorage.setItem('token', reslut.token);
        localStorage.setItem('expiresAt', reslut.expiresAt);
        window.location.href = '/';
      } else if (statusCode === 400) {
        errorMessage = reslut.error;
        if (errorMessage === 'Content-Type wrong') {
          // Content-Type wrong 
          this.setState({'errorMessage': errorMessage});
        } else if (errorMessage === 'missing field') {
          // missing field
          this.setState({'errorMessage': errorMessage});
        } else if (errorMessage === 'email format error') {
          // email format error
          this.setState({'errorMessage': errorMessage});
        } else if (errorMessage ===
          'password format error') {
          this.setState({'errorMessage': errorMessage});
        }
      } else if (statusCode === 403) {
        // password not match
        this.setState({'errorMessage': 'not match'});
        this.setState({'loginStatus': 'notLogin'});
      } else if (statusCode === 500) {
        // something went wrong
        this.setState({'errorMessage': errorMessage});
      }
    });
  }
  render() {
    return (
      <form onSubmit={this.onSubmit} className="loginFrom">
        <input type="email" name="email" required/>
        <input type="password" name="password" minLength='6' required/>
        <input type="submit"
          value={this.state.loginStatus === 'notLogin' ? 'Login' : 'Logining'}/>
        <span className="errorMessage">{this.state.errorMessage}</span>
      </form>
    );
  }
}

export default LoginComponent;
