import React from 'react';
import VideoPreview from '../../VideoPreviewComponent';

const VideosFullView = (props) => {
  let renderElement = [];

  if (props.pagetype === 'trending') {
    let order = props.videoInfos;

    order.sort((a, b) => b.viewNumber - a.viewNumber);
    renderElement = order.map((value, index) => {
      return (
        <VideoPreview
          videoInfo={value}
          key={value.videoId} />
      );
    });

  } else if (props.pagetype === 'liked') {
    renderElement = props.videoInfos.filter((videoInfo) => {
      return videoInfo.likeStatus.some((likeStatus) => {
        return props.userId === likeStatus.userId && likeStatus.liked === true;
      });
    }).map((filteredVideoInfo) => {
      return <VideoPreview
        videoInfo={filteredVideoInfo}
        key={filteredVideoInfo.videoId} /> 
    });

  } else if (props.pagetype === 'feed') {
    renderElement = props.videoInfos.filter((videoInfo) => {
      return (videoInfo.author === props.username);
    }).map((value)=>{
      return  <VideoPreview
             videoInfo={value}
             key={value.videoId} />
    });

  } else if (props.pagetype === 'history') {
    if(props.history !== undefined){
      renderElement = props.videoInfos.filter((videoInfo)=>{
        return props.history.some((singleHistory)=>{
          return videoInfo.userId === singleHistory.userId;
        });
      }).map((value)=>{
        return <VideoPreview
        videoInfo={value}
        key={value.videoId} />
      })
    }

  } else if (props.pagetype === 'watchlater') {
    if(props.watchlater !== undefined) {
      renderElement = props.videoInfos.filter((videoInfo)=>{
        return props.watchlater.some((watchElement)=>{
          return videoInfo.videoId === watchElement.videoId;
        });
      }).map((value)=>{
        return <VideoPreview
        videoInfo={value}
        key={value.videoId} />
      })
    }
  }

  return (
    <div className="suggested-video-ul">
      {renderElement}
    </div>
  );
};

export default VideosFullView;

