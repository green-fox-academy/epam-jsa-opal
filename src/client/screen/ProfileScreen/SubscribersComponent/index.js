import React from 'react';

class Subscribers extends React.Component {
  render() {
    let subscribersList = this.props.subscribers.map((value) => (
      <div className="subscriber" key={value.userId}>
        <a href={'/profile?username=' + value.username}><img src={value.avatar} alt=""/></a>
        <span>{value.username}</span>
      </div>
    ));

    return (
      <div className="subscribers-list">
        {subscribersList}
      </div>
    );
  }
}

export default Subscribers;
