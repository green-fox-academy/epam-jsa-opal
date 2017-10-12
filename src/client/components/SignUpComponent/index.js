import React from 'react';
import SignUpForm from '../SignUpForm';

let url = 'http://localhost:3000/api/signup';
class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'status': 'being',
      'error': '',
      'errorUsername': false,
      'errorEmail': false,
      'errorPhone': false,
      'errorFullname': false,
      'errorPassword': false,
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
        let errorText = JSON.parse(xhr.responseText).error;
        if (xhr.status === 400) {
          if (errorText === 'the username is void') {
            this.setState({'errorUsername': true});
          }
          if (errorText === 'the email is void') {
            this.setState({'errorEmail': true});
          }
          if (errorText === 'the email format is invalid') {
            this.setState({'errorEmail': true});
          }
          if (errorText === 'the phone number is void') {
            this.setState({'errorPhone': true});
          }
          if (errorText === 'the phone number is invalid') {
            this.setState({'errorPhone': true});
          }
          if (errorText === 'the full name is void') {
            this.setState({'errorFullname': true});
          }
          if (errorText === 'the full name is invalid') {
            this.setState({'errorFullname': true});
          }
          if (errorText === 'the password is void') {
            this.setState({'errorPassword': true});
          }
          if (errorText === 'the password is too short') {
            this.setState({'errorPassword': true});
          }
          this.setState({'error': errorText});
        }
        if (xhr.status === 409) {
          if (errorText === 'username conflicts!') {
            this.setState({'errorUsername': true});
          }
          if (errorText === 'email conflicts!') {
            this.setState({'errorEmail': true});
          }
          if (errorText === 'phone number conflicts!') {
            this.setState({'errorPhone': true});
          }
          this.setState({'error': errorText});
        }
        if (xhr.status === 500) {
          this.setState({'error': errorText});
        }
      }
      this.setState({'status': 'being'});
    }.bind(this));
    xhr.open('POST', url);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    this.setState({'status': 'loading'});
    xhr.send(jsonData);
  }

  render() {
    return <SignUpForm

      isLoading={this.state.status === 'loading'}
      errorMessage={this.state.error}
      errorUsername={this.state.errorUsername}
      errorEmail={this.state.errorEmail}
      errorPhone={this.state.errorPhone}
      errorFullname={this.state.errorFullname}
      errorPassword={this.state.errorPassword}
      onSubmit={this.submitHandler.bind(this)}
    />;
  }
}

export default SignUpComponent;
