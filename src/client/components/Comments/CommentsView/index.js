import React from 'react';
import Comment from '../Comment';

class CommentsView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let lists = <Comment />;

    return (
      <ul className="comments-ul">
        {lists}
      </ul>
    );
  }
}

export default CommentsView;
