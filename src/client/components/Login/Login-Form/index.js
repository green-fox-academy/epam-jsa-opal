import React from 'react';
import './index.scss';

const LoginForm = (props) => (
  <form onSubmit={props.onSubmit} className="loginFrom">
    <h1>Login</h1>
    <input type="email" name="email" required placeholder="email"/>
    <input type="password" name="password"
      minLength="6" required placeholder="password"/>
    <input type="submit"
      value={props.loginStatus === 'notLogin' ? 'Login' : 'Logining'}
      disabled={props.loginStatus === 'notLogin' ? false : true}
      className={props.loginStatus === 'notLogin' ? '' : 'logining'}
    />
    <a className="register-link" href="/signup">register now</a>
    <span className="errorMessage">{props.errorMessage}</span>
  </form>
);

export default LoginForm;

