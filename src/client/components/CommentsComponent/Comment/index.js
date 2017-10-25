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
      likeNums: this.props.commentInfo.likeNums,
      dislikeNums: this.props.commentInfo.dislikeNums,
    };
  }
  onClickComment() {
    this.setState({clickComment: true});
  }
  onClickCancel() {
    this.setState({clickComment: false});
  }
  onClickLikeButton() {
    //click like button
    const likeState = this.state.likeState;
    if (likeState.clickDislike) {
      fetch('/api/'+this.props.videoId+'/'+this.props.commentId+'/dislikedisable',{
        'method': 'put',
         headers: {'Authorization': localStorage.getItem('token')},
      }).then((response)=>{
        let newNums = this.state.dislikeNums-1;
        this.setState({dislikeNums: newNums});
      })
      likeState.clickDislike = !likeState.clickDislike;
    } else {
      if (likeState.clickLike === false) {
        fetch('/api/'+this.props.videoId+'/'+this.props.commentId+'/likeenable',{
          'method': 'put',
           headers: {'Authorization': localStorage.getItem('token')},
        }).then((response)=>{
          let newNums = this.state.likeNums+1;
          this.setState({likeNums: newNums});
        })
      }else{
        fetch('/api/'+this.props.videoId+'/'+this.props.commentId+'/likedisable',{
          'method': 'put',
           headers: {'Authorization': localStorage.getItem('token')},
        }).then((response)=>{
          let newNums = this.state.likeNums-1;
          this.setState({likeNums: newNums});
        })
      }
      likeState.clickLike = !likeState.clickLike;
    }
    this.setState({likeState: likeState});
  }
  onClickDislikeButton() {
    const likeState = this.state.likeState;

    if (likeState.clickLike) {
      fetch('/api/'+this.props.videoId+'/'+this.props.commentId+'/likedisable',{
        'method': 'put',
         headers: {'Authorization': localStorage.getItem('token')},
      }).then((response)=>{
        let newNums = this.state.likeNums-1;
        this.setState({likeNums: newNums});
      })
      likeState.clickLike = !likeState.clickLike;
    } else {
      if (likeState.clickDislike === false) {
        fetch('/api/'+this.props.videoId+'/'+this.props.commentId+'/dislikeenable',{
          'method': 'put',
           headers: {'Authorization': localStorage.getItem('token')},
        }).then((response)=>{
          let newNums = this.state.dislikeNums+1;
          this.setState({dislikeNums: newNums});
        })
      }else {
        fetch('/api/'+this.props.videoId+'/'+this.props.commentId+'/dislikedisable',{
          'method': 'put',
           headers: {'Authorization': localStorage.getItem('token')},
        }).then((response)=>{
          let newNums = this.state.dislikeNums-1;
          this.setState({dislikeNums: newNums});
        })
        console.log('111')
      }
      likeState.clickDislike = !likeState.clickDislike;
      this.setState({likeState: likeState});
  }
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
          <span className="like-num">{this.state.likeNums}</span>
          <button
            className={this.state.likeState.clickDislike ?
              'clicked dislike-button' :
              'dislike-button'
            }
            onClick={this.onClickDislikeButton}>
          </button>
          <span className="dislike-num">
            {this.state.dislikeNums}
          </span>
          <button className="input-comment"
            onClick={this.onClickComment}>Reply</button>
          <p className="comment-time">{this.state.commentTime}</p>
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
