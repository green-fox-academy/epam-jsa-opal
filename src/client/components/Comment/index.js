import React from 'react';
import './index.scss';
import CommentView from './CommentView';

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <CommentView />
    );
  }
}

export default Comment;
