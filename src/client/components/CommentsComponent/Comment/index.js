import React from 'react';
import InputComment from '../InputComment';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.onClickComment = this.onClickComment.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onClickLikeButton = this.onClickLikeButton.bind(this);
    this.onClickDislikeButton = this.onClickDislikeButton.bind(this);
    this.state = {
      likeState: {
        LikeStatus: this.props.commentInfo.LikeStatus,
        clickLike: this.props.commentInfo.likestatus,
        clickDislike: this.props.commentInfo.dislikestatus,
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
      console.log('/api/'+this.props.videoId+'/'+this.props.commentId+'/likeenable');
      fetch('/api/'+this.props.videoId+'/'+this.props.commentId+'/likeenable',{
        'method': 'put',
         headers: {'Authorization': localStorage.getItem('token')},
      }).then(function(result){ 
        return result;
      }).then(function(obj){
        fetch('/api'+ '59f01e196151e77ba4235329').then(function(resultFetch){
          return resultFetch.json();
        }).then(function(objFetch){
          this.props.updateVideoInfos(objFetch);
        })
      });
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
      <div className="comment" >
        <img src={this.props.commentInfo.avatar} alt=""/>
        <div className="comment-container">
          <p className="username">{this.props.commentInfo.username}</p>
          <p className="comment-content">
            {this.props.commentInfo.commentContent}
          </p>
          <button
            className={this.state.likeState.clickLike ?
              'clicked like-button' :
              'like-button'
            }
            onClick={this.onClickLikeButton}>
          </button>
          <span className="like-num">{this.props.commentInfo.likeNums}</span>
          <button
            className={this.state.likeState.clickDislike ?
              'clicked dislike-button' :
              'dislike-button'
            }
            onClick={this.onClickDislikeButton}>
          </button>
          <span className="dislike-num">
            {this.props.commentInfo.dislikeNums}
          </span>
          <button className="input-comment"
            onClick={this.onClickComment}>Reply</button>
          <p className="comment-time">{this.props.commentInfo.commentTime}</p>
          <button className="comment-setting"></button>
          <InputComment
            clicked={this.state.clickComment}
            onClickCancel={this.onClickCancel}
            avatar={this.props.avatar}
          />
        </div>
      </div>
    );
  }
}

export default Comment;
