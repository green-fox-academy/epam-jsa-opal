import React from 'react';
import Comment from '../Comment';
import InputComment from '../InputComment';

class CommentsView extends React.Component {
  constructor(props) {
    super(props);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.state = {clickComment: false};
  }
  onClickCancel() {
    this.setState({clickComment: false});
  }
  render() {
    let lists = this.props.commentInfos.map((value) => (
      <Comment
        videoId={this.props.videoId}
        updateVideoInfos={this.props.updateVideoInfos}
        commentId={value.commentId}
        commentInfo={value}
        key={value.commentId}
        avatar={this.props.avatar}
      />
    ));
    console.log("In the comment view"+this.props.videoId);

    return (
      <div className="comments-lists">
        { this.props.posting ?
          <div className="loader"></div>
          :
          null
        }
        <InputComment
          clicked={this.state.clickComment}
          onClickCancel={this.onClickCancel}
          isComment={true}
          addComment={this.props.addComment}
          avatar={this.props.avatar}
          videoId={this.props.videoId}
        />
        <ul className="comments-ul">
          {lists}
        </ul>
      </div>
    );
  }
}

export default CommentsView;
