import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Signup from '../client/screen/SignUpScreen';
import header from '../client/components/header';
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={header} />
          <Route path="/signup" component={Signup} />
        </div>
      </Router>
    );
  }
}

export default App;
