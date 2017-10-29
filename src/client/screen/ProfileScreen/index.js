import React from 'react';
import './index.scss';
import Uploads from '../../components/SuggestedVideosComponent/SuggestedVideosView';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'tab': 'profile',
      'modify': false,
      'profileInfos': {},
    };
    this.defalutProfileInfos = {};
    this.fetchProfileInfos = this.fetchProfileInfos.bind(this);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangeAvatar = this.onChangeAvatar.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.fetchProfileInfos(this.props.location.search.split('=')[1], (profileInfos) => {
      this.defalutName = profileInfos.fullName;
      this.defalutAvatar = profileInfos.avatar;
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

    this.setState({'modify': true});
    fetch('/api/profile/' + ev.target.elements.namedItem('username').value, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
      body: JSON.stringify(obj),
    }).then((response) => {
      this.setState({'modify': false});
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
  onCancel() {
    let defaultInfos = this.defalutProfileInfos;

    defaultInfos.fullName = this.defalutName;
    defaultInfos.avatar = this.defalutAvatar;
    this.setState({profileInfos: defaultInfos});
  }
  render() {
    return (
      <div className="userInfos">
        <div className="profile-preview">
          <img src={this.state.profileInfos.avatar}/>
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
          <label>Username</label>
          <input type="text" name="username" value={this.state.profileInfos.username} disabled={true}/>
          <label>Email</label>
          <input type="email" name="email" value={this.state.profileInfos.email} disabled={true}/>
          <label>Phone number</label>
          <input type="phoneNumber" name="phoneNumber" value={this.state.profileInfos.phoneNumber} disabled={true}/>
          <label htmlFor="fullName">Full name</label>
          <input type="text" name="fullName" id="fullName" value={this.state.profileInfos.fullName} onChange={this.onChangeFullName} required placeholder="full name"/>
          <label htmlFor="avatar">Avatar</label>
          <input type="avatar" name="avatar" id="avatar" value={this.state.profileInfos.avatar} onChange={this.onChangeAvatar} required placeholder="avatar"/>
          <button type="submit" disabled={this.state.modify}>Modify</button>
          <button type="button" className="cancel" onClick={this.onCancel.bind(this)}>Cancel</button>
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
          <Uploads videoInfos={this.props.uploads} suggestedVideosNum={30}/>
        </div>
      </div>
    );
  }
}

ProfileScreen.defaultProps = {
  uploads: [
    {
      'videoId': '59f5564ef4ab731448b260d2',
      'videoSrc': 'https://static.videezy.com/system/resources/previews/000/005/501/original/Earth_Sun_over_top.mp4',
      'previewSrc': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf5H7b5S-9semZ9Y7tLhEXJmfaiAEyedxZNdKUBTHiKa1f_4figA',
      'title': 'BB',
      'videoTime': '5:00',
      'author': 'bug2',
      'viewNumber': 0,
    },
    {
      'videoId': '59f32fc922c1552410b5104b',
      'videoSrc': 'http://www.html5videoplayer.net/videos/toystory.mp4',
      'previewSrc': 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2F736x%2F1f%2F33%2F37%2F1f3337d46984b00569be6d6310e05d4b--famous-movie-posters-movie-covers.jpg&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fallystardy%2Fmovie-posters%2F&docid=uKHwNW2Z9J_QkM&tbnid=87cGlPf9r8usFM%3A&vet=10ahUKEwjWyZfQ7ZDXAhUJULwKHTlBAYMQMwiqAigqMCo..i&w=288&h=433&bih=840&biw=1583&q=movie%20poster&ved=0ahUKEwjWyZfQ7ZDXAhUJULwKHTlBAYMQMwiqAigqMCo&iact=mrc&uact=8',
      'title': 'SS',
      'videoTime': '5:00',
      'author': 'bug1',
      'viewNumber': 0,
    },
    {
      'videoId': '59f5564ef4ab731448b260d3',
      'videoSrc': 'https://static.videezy.com/system/resources/previews/000/005/501/original/Earth_Sun_over_top.mp4',
      'previewSrc': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf5H7b5S-9semZ9Y7tLhEXJmfaiAEyedxZNdKUBTHiKa1f_4figA',
      'title': 'BB',
      'videoTime': '5:00',
      'author': 'bug2',
      'viewNumber': 0,
    },
    {
      'videoId': '59f32fc922c1552410b5104d',
      'videoSrc': 'http://www.html5videoplayer.net/videos/toystory.mp4',
      'previewSrc': 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2F736x%2F1f%2F33%2F37%2F1f3337d46984b00569be6d6310e05d4b--famous-movie-posters-movie-covers.jpg&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fallystardy%2Fmovie-posters%2F&docid=uKHwNW2Z9J_QkM&tbnid=87cGlPf9r8usFM%3A&vet=10ahUKEwjWyZfQ7ZDXAhUJULwKHTlBAYMQMwiqAigqMCo..i&w=288&h=433&bih=840&biw=1583&q=movie%20poster&ved=0ahUKEwjWyZfQ7ZDXAhUJULwKHTlBAYMQMwiqAigqMCo&iact=mrc&uact=8',
      'title': 'SS',
      'videoTime': '5:00',
      'author': 'bug1',
      'viewNumber': 0,
    },
  ],
};

export default ProfileScreen;
