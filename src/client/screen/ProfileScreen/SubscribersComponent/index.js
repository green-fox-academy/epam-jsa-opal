import React from 'react';

class Subscribers extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let subscribersList = this.props.subscribers.map((value) => (
      <li key={value.username}>
        <a href={'/profile?username=' + value.username}><img src={value.avatar} alt=""/></a>
        <span>{value.username}</span>
      </li>
    ));

    return (
      <ul>
        {subscribersList}
      </ul>
    );
  }
}

export default Subscribers;
