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
  addComment(value, videoId) {
    let commentInfos = this.state.commentInfos;
    let oldCommentInfos = commentInfos;
    let statusCode;
    let inputValue = value;
    let addCommentInfo = [
      {
        'avatar': userAvatar,
        'username': 'zoe',
        'commentContent': inputValue,
        'clickedLike': false,
        'clickedDislike': false,
        'LikeStatus': [],
        'commentTime': Date.now(),
        'commentId': commentInfos.length + 1,
      },
    ];

    commentInfos = commentInfos.concat(addCommentInfo);
    this.setState({commentInfos: commentInfos});
    fetch('/api/videos/' + videoId + '/comments/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
      body: JSON.stringify({'content': value}),
    })
      .then((response) => {
        statusCode = response.status;
        response.json();
      })
      .then((result) => {
        if (statusCode !== 200) {
          this.setState({commentInfos: oldCommentInfos});
        }
      });
  }
  render() {
    return (
      <CommentsView commentInfos={this.state.commentInfos}
        addComment={this.addComment}
        avatar={userAvatar}
        videoId={this.props.videoId}
      />
    );
  }
}

export default Comments;
