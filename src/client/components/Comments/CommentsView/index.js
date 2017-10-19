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
        commentInfo={value}
        key={value.commentId}
      />
    ));

    return (
      <div className="comments-lists">
        <InputComment
          clicked={this.state.clickComment}
          onClickCancel={this.onClickCancel}
          isComment={true}
        />
        <ul className="comments-ul">
          {lists}
        </ul>
      </div>
    );
  }
}

export default CommentsView;
