import React from 'react';
import './index.scss';
import CommentsView from './CommentsView';
import userAvatar from './assets/Oval 4.png';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
    this.state = {'posting': false};
  }
  addComment(value, videoId) {
    let statusCode;

    this.setState({'posting': true});
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
        if (statusCode === 200) {
          this.fetchVideoInfos('59f04d7d5d8c7686dea115b6', (videoInfos) => {
            this.props.updateVideoInfos(videoInfos);
            this.setState({'posting': false});
          });
        }
      });
  }
  fetchVideoInfos(videoId, callback) {
    fetch('/api/videos/' + videoId)
      .then((response) => response.json())
      .then((result) => callback(result));
  }
  render() {
    return (
      <CommentsView commentInfos={this.props.commentInfos}
        addComment={this.addComment}  
        updateVideoInfos={this.props.updateVideoInfos}     
        objectId={this.props.objectId}
        avatar={userAvatar}
        videoId={this.props.videoId}
        posting={this.state.posting}
      />
    );
  }
}

export default Comments;
