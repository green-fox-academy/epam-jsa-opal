import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Signup from '../client/screen/SignUpScreen';
import Login from '../client/components/Login';
import Video from '../client/components/VideoComponent';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Video} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </div>
      </Router>
    );
  }
}

export default App;
