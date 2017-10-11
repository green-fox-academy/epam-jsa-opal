import React from 'react';
import SignUpForm from '../SignUpForm';

let url = 'http://localhost:8080';
class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'status': 'being',
      'error': '',
    };
  }
  submitHandler(ev) {
    ev.preventDefault();
    let userName = ev.target.elements.namedItem('username').value;
    let email = ev.target.elements.namedItem('email').value;
    let phone = ev.target.elements.namedItem('phone').value;
    let fullName = ev.target.elements.namedItem('fullname').value;
    let password = ev.target.elements.namedItem('password').value;
    let obj = {
      username: userName,
      email: email,
      phone: phone,
      fullname: fullName,
      password: password,
    };
    let jsonData = JSON.stringify(obj);
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 404) {
          let errorText = 'Not Found';
          this.setState({'error': errorText});
        }
        if (xhr.status === 400) {
          let errorText = xhr.responseText;
          this.setState({'error': errorText});
        }
        if (xhr.status === 409) {
          let errorText = xhr.responseText;
          this.setState({'error': errorText});
        }
        if (xhr.status === 500) {
          let errorText = xhr.responseText;
          this.setState({'error': errorText});
        }
      }
    }.bind(this));
    xhr.open('POST', 'http://localhost:8080/signup');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    this.setState({'status': 'loading'});
    xhr.send(jsonData);
  }

  render() {
    return <SignUpForm isLoading={this.state.status === 'loading'} isError={this.state.error} onSubmit={this.submitHandler.bind(this)}/>;
  }
}

export default SignUpComponent;
