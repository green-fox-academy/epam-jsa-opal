import React from 'react';
import InputComment from '../InputComment';
import avatar from '../assets/avatar.png';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.onClickComment = this.onClickComment.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onClickLikeButton = this.onClickLikeButton.bind(this);
    this.onClickDislikeButton = this.onClickDislikeButton.bind(this);
    this.state = {
      likeState: {
        clickLike: false,
        clickDislike: false,
      },
      clickComment: false,
    };
  }
  onClickComment() {
    this.setState({clickComment: true});
  }
  onClickCancel() {
    this.setState({clickComment: false});
  }
  onClickLikeButton() {
    const likeState = this.state.likeState;

    if (likeState.clickDislike) {
      likeState.clickDislike = !likeState.clickDislike;
    } else {
      likeState.clickLike = !likeState.clickLike;
    }
    this.setState({likeState: likeState});
  }
  onClickDislikeButton() {
    const likeState = this.state.likeState;

    if (likeState.clickLike) {
      likeState.clickLike = !likeState.clickLike;
    } else {
      likeState.clickDislike = !likeState.clickDislike;
    }
    this.setState({likeState: likeState});
  }
  render() {
    return (
      <li className="comment">
        <img src={avatar} alt=""/>
        <div className="comment-container">
          <p className="username">Zoe</p>
          <p className="comment-content">oh!! i love this video amazing</p>
          <button
            className={this.state.likeState.clickLike ?
              'clicked like-button' :
              'like-button'
            }
            onClick={this.onClickLikeButton}>
          </button>
          <span className="like-num">123</span>
          <button
            className={this.state.likeState.clickDislike ?
              'clicked dislike-button' :
              'dislike-button'
            }
            onClick={this.onClickDislikeButton}>
          </button>
          <span className="dislike-num">12</span>
          <button className="input-comment"
            onClick={this.onClickComment}>Comment</button>
          <p className="comment-time">3 hrs ago</p>
          <button className="comment-setting"></button>
          <InputComment
            clicked={this.state.clickComment}
            onClickCancel={this.onClickCancel}
          />
        </div>
      </li>
    );
  }
}

export default Comment;
