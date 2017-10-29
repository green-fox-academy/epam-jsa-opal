import React from 'react';
import './index.scss';
import VideoLists from '../../components/SuggestedVideosComponent/SuggestedVideosView/index';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'tab': 'profile',
      'modify': 'false',
      'profileInfos': {},
    };
    this.fetchProfileInfos = this.fetchProfileInfos.bind(this);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangeAvatar = this.onChangeAvatar.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.fetchProfileInfos(this.props.location.search.split('=')[1], (profileInfos) => {
      console.log('get infos');
      this.setState({'profileInfos': profileInfos});
    });
  }
  fetchProfileInfos(userName, callback) {
    fetch('/api/profile/' + userName, {headers: {'Authorization': localStorage.getItem('token')}})
      .then((response) => response.json())
      .then((result) => callback(result));
  }
  onClickProfile() {
    this.setState({'tab': 'profile'});
  }
  onClickSubscription() {
    this.setState({'tab': 'subscription'});
  }
  onClickVideo() {
    this.setState({'tab': 'video'});
  }
  onChangeFullName(ev) {
    let profileInfos = this.state.profileInfos;

    profileInfos.fullName = ev.target.value;
    this.setState({'profileInfos': profileInfos});
  }
  onChangeAvatar(ev) {
    let profileInfos = this.state.profileInfos;

    profileInfos.avatar = ev.target.value;
    this.setState({'profileInfos': profileInfos});
  }
  onSubmit(ev) {
    ev.preventDefault();
    let statusCode;
    let obj = {
      'username': ev.target.elements.namedItem('username').value,
      'email': ev.target.elements.namedItem('email').value,
      'phoneNumber': ev.target.elements.namedItem('phoneNumber').value,
      'fullName': ev.target.elements.namedItem('fullName').value,
      'avatar': ev.target.elements.namedItem('avatar').value,
    };

    this.setState({'modify': 'true'});
    fetch('/api/profile/' + ev.target.elements.namedItem('username').value, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
      body: JSON.stringify(obj),
    }).then((response) => {
      statusCode = response.status;
      return response.json();
    }).then((result) => {
      if (statusCode === 201) {
        window.location.reload();
      } else {
        console.log('field')
      }
    });
  }
  render() {
    console.log('render infos');
    return (
      <div className="userInfos">
        <div className="profile-preview">
          <img src={this.state.profileInfos.avatar} alt="format error"/>
          <span className="user-full-name">{this.state.profileInfos.fullName}</span>
        </div>
        <nav>
          <button className="my-profile-button" onClick={this.onClickProfile.bind(this)}>profife</button>
          <button className="my-subscriptions-button" onClick={this.onClickSubscription.bind(this)}>subscriptions</button>
          <button className="my-videos-button" onClick={this.onClickVideo.bind(this)}>videos</button>
        </nav>
        <form className={this.state.tab === 'profile' ?
          'my-profile show' :
          'my-profile'} 
        onSubmit={this.onSubmit}
        >
          <h1>Profile</h1>
          <input type="text" name="username" value={this.state.profileInfos.username} disabled={true}/>
          <input type="email" name="email" value={this.state.profileInfos.email} disabled={true}/>
          <input type="phoneNumber" name="phoneNumber" value={this.state.profileInfos.phoneNumber} disabled={true}/>
          <input type="text" name="fullName" value={this.state.profileInfos.fullName} onChange={this.onChangeFullName} required/>
          <input type="avatar" name="avatar" value={this.state.profileInfos.avatar} onChange={this.onChangeAvatar} required/>
          <button type="submit">Modify</button>
        </form>
        <div className={this.state.tab === 'subscription' ?
          'my-subscriptions show' :
          'my-subscriptions'} >
          <h1>Subscriptions</h1>
          <ul>
            <li>user1</li>
            <li>user2</li>
            <li>user3</li>
            <li>user4</li>
            <li>user5</li>
          </ul>
        </div>
        <div className={this.state.tab === 'video' ?
          'my-videos show' :
          'my-videos'} >
          <h1>My Videos</h1>
          <ul>
            <li>video1</li>
            <li>video2</li>
            <li>video3</li>
            <li>video4</li>
            <li>video5</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ProfileScreen;
