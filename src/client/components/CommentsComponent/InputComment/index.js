import React from 'react';
import './index.scss';

class InputComment extends React.Component {
  constructor(props) {
    super(props);
    this.onchangeInput = this.onchangeInput.bind(this);
    this.state = {empty: true, value: ''};
  }
  onchangeInput(ev) {
    if (ev.target.value.trim().length > 0) {
      this.setState({empty: false});
      this.setState({value: ev.target.value});
    } else {
      this.setState({empty: true});
      this.setState({value: ev.target.value});
    }
  }
  render() {
    return (
      <div className={this.props.clicked ?
        'add-comment clicked-comment' : 'add-comment'}
      >
        <img src={this.props.avatar} alt="11"/>
        <div className="add-comment-content">
          <input type="text" name="add-comment" onChange={this.onchangeInput}
            placeholder={this.props.isComment ?
              'Leave a comment about this video' :
              'reply a message to this message'
            }
            value={this.state.value}
          />
          <div className="buttons">
            <input type="button" value="CANCEL"
              onClick={this.props.onClickCancel}/>
            <input type="submit" value={this.props.isComment ?
              'COMMENT' :
              'REPLY'
            }
            className={this.state.empty ? '' : 'active'}
            disabled={this.state.empty ? true : false}
            onClick={() => {
              this.props.addComment(this.state.value, this.props.videoId);
              this.setState({value: ''});
              this.setState({empty: true});
            }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default InputComment;
