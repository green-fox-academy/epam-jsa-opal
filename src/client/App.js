import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Signup from '../client/screen/SignUpScreen';
import Login from '../client/components/Login';
import Header from '../client/components/header';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Header} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/heartbeat" component={Header} />
        </div>
      </Router>
    );
  }
}

export default App;
