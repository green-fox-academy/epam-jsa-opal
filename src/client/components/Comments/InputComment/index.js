import React from 'react';
import './index.scss';
import avatar from '../assets/avatar.png';

class InputComment extends React.Component {
  constructor(props) {
    super(props);
    this.onchangeInput = this.onchangeInput.bind(this);
    this.state = {empty: true};
  }
  onchangeInput(ev) {
    if (ev.target.value.trim().length > 0) {
      this.setState({empty: false});
    } else {
      this.setState({empty: true});
    }
  }
  render() {
    return (
      <div className={this.props.clicked ?
        'add-comment clicked-comment' : 'add-comment'}
      >
        <img src={avatar} alt=""/>
        <div className="add-comment-content">
          <input type="text" name="add-comment" onChange={this.onchangeInput}
            placeholder={this.props.isComment ?
              'Leave a comment about this video' :
              'reply a message to this message'
            }
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
            />
          </div>
        </div>
      </div>
    );
  }
}

export default InputComment;
