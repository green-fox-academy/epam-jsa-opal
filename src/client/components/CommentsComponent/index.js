import React from 'react';
import './index.scss';
import CommentsView from './CommentsView';
import userAvatar from './assets/Oval 4.png';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
    this.state = {commentInfos: this.props.commentInfos};
  }
  componentWillReceiveProps(nextProps) {
    this.state = {commentInfos: nextProps.commentInfos};
  }
  addComment(value) {
    let commentInfos = this.state.commentInfos;
    let inputValue = value;
    let addCommentInfo = [
      {
        'avatar': userAvatar,
        'username': 'zoe',
        'commentContent': inputValue,
        'likeNum': 1,
        'clickedLike': false,
        'clickedDislike': false,
        'dislikeNum': 1,
        'commentTime': new Date().toLocaleString(),
        'commentId': commentInfos.length + 1,
      },
    ];

    commentInfos = commentInfos.concat(addCommentInfo);
    this.setState({commentInfos: commentInfos});
  }
  render() {
    return (
      <CommentsView commentInfos={this.state.commentInfos}
        addComment={this.addComment}
        avatar={userAvatar}
      />
    );
  }
}

export default Comments;
