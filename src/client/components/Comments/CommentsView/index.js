import React from 'react';
import Comment from '../Comment';

class CommentsView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let lists = this.props.commentInfos.map(((value) => (
      <Comment
        commentInfo={value}
        key={value.commentId}
      />
    )));

    return (
      <ul className="comments-ul">
        {lists}
      </ul>
    );
  }
}

export default CommentsView;
