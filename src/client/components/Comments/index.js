import React from 'react';
import './index.scss';
import CommentsView from './CommentsView';

class Comments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CommentsView />
    );
  }
}

export default Comments;
