import React from 'react';
import VideoPreview from '../../VideoPreviewComponent';

const VideosFullView = (props) => {
  let suggestedVideosLists = [];
  if(props.pagetype === 'trending') {
    let order = props.videoInfos;
    order.sort((a,b)=>{
      return b.viewNumber - a.viewNumber;
    });
    suggestedVideosLists = order.map((value, index) => {
    return (
      <VideoPreview
        videoInfo={value}
        key={value.videoId} />
      );
    });
  }else if(props.pagetype === 'liked') {
    props.videoInfos.map((value, index) => {
      value.Likestatus.map((likelist,index)=>{
        if(props.userId === likelist.userId && likelist.liked === true) {
          suggestedVideosLists.push(
            <VideoPreview
            videoInfo={value}
            key={value.videoId} />
          );
        }
      });
    });
  }else if(props.pagetype === 'feed') {
    props.videoInfos.map((value, index)=> {
      if(props.username === value.author) {
        suggestedVideosLists.push(
          <VideoPreview
          videoInfo={value}
          key={value.videoId} />
        );
      }
    });
  }else if (props.pagetype === 'history') {
    let history = props.history;
    props.videoInfos.map((video, index)=>{
      if(history !== undefined) {
        history.map((value, index)=>{
          if(value.videoId === video.videoId) {
            suggestedVideosLists.push(
              <VideoPreview
              videoInfo={video}
              key={video.videoId} />
            );
          }
        })
      }
    });

  } else if (props.pagetype === 'watchlater') {
    let watchlater = props.watchlater;
    props.videoInfos.map((video, index)=> {
      if(watchlater !== undefined) {
        watchlater.map((value, index)=> {
          if(value.videoId === video.videoId){
            suggestedVideosLists.push(
              <VideoPreview
              videoInfo={video}
              key={video.videoId} />
            );
          }
        });
      }
    });
  }

  return (
    <div className="suggested-video-ul">
      {suggestedVideosLists}
    </div>
  );
};

export default VideosFullView;

