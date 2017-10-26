'use strict';

import React from 'react';
import Header from '../../components/HeaderComponent';
import NavigationBar from '../../components/NavigationBarComponent';
import SuggestedVideos from '../../components/SuggestedVideosComponent';
import VideoComponent from '../../components/VideoComponent';
import './index.scss';
 
 class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {videoLists: []};
  }
  componentDidMount() {
    this.fetchVideoLists((result) => {
      this.setState({videoLists: result});
    });
  }
  fetchVideoLists(callback) {
    fetch('/api/videos')
      .then((response) => response.json())
      .then((result) => callback(result));
  }
   render() {
     return (
      <div className="homecontainer">
        <Header className="header"/>
        <div className="main">
          <NavigationBar className="navigationBar"/>
          <div className="videoComponent"> <VideoComponent /> </div>
         <div className="suggestedVideos"> <SuggestedVideos videoLists={this.state.videoLists}/> </div>
         </div>
       </div>
     );
  }
}

export default Home;
