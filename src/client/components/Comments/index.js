import React from 'react';
import './index.scss';
import CommentsView from './CommentsView';
import avatar from './assets/avatar.png';

class Comments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CommentsView commentInfos={this.props.commentInfos}/>
    );
  }
}

Comments.defaultProps = {
  commentInfos: [
    {
      'avatar': avatar,
      'username': 'zoe1',
      'commentContent': 'oh!! i love this video amazing',
      'likeNum': 123,
      'clickedLike': true,
      'clickedDislike': false,
      'dislikeNum': 99,
      'commentTime': '1 hrs ago',
      'commentId': 1,
      'applys': [
        {
          'avatar': avatar,
          'username': 'zoeinside',
          'commentContent': 'oh!! i love this video amazing',
          'likeNum': 123,
          'clickedLike': true,
          'clickedDislike': false,
          'dislikeNum': 99,
          'commentTime': '1 hrs ago',
          'commentId': 3,
        },

      ],
    },
    {
      'avatar': avatar,
      'username': 'zoe2',
      'commentContent': 'oh!! i love this video amazing',
      'likeNum': 123,
      'dislikeNum': 99,
      'commentTime': '2 hrs ago',
      'commentId': 2,
    },
  ],
};

export default Comments;
