import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Signup from '../client/screen/SignUpScreen';
import Hello from '../client/components/Hello';
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Hello} />
          <Route path="/signup" component={Signup} />
        </div>
      </Router>
    );
  }
}

export default App;
