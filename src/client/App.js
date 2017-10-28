import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Signup from '../client/screen/SignUpScreen';
import Login from '../client/screen/LoginScreen';
import Home from '../client/screen/HomeScreen';
import Trending from '../client/screen/TrendingScreen';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Signup} />
          <Route path="/Trending" component={Trending} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
          <Route path="/watch" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
