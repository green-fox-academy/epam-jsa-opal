import React from 'react';

class CommentView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul className="comments-ul">
        <li className="comment">
          <img src="" alt=""/>
          <div className="comment-container">
            <p className="username">perason</p>
            <p className="comment-content">oh!! i love this video amazing</p>
            <button className="like-button"></button>
            <button className="dislike-button"></button>
            <button className="input-comment">Comment</button>
            <p className="comment-time">3 hrs ago</p>
            <button className="comment-setting"></button>
          </div>
        </li>
      </ul>
    );
  }
}

export default CommentView;
