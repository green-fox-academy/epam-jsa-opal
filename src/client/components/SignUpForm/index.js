import React from 'react';
import './index.scss';

const SignUpForm = (props) => (
  <form className="signup-form" onSubmit={props.onSubmit}>
    <input name="username" style={props.style.userName} required placeholder="Username" />
    <input type="email" name="email" required placeholder="E-mail" />
    <input name="phone" required placeholder="Phone Number" />
    <input name="fullname" required placeholder="Full Name" />
    <input type="password" name="password" required placeholder="Password"/>
    <input type="submit" value={props.isLoading ? 'loading' : 'signup'}/>
    <label >{props.isError}</label>
  </form>
);

export default SignUpForm;
