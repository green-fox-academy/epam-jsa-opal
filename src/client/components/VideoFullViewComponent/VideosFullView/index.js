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
      console.log(value);
      if(props.username === value.author) {
        suggestedVideosLists.push(
          <VideoPreview
          videoInfo={value}
          key={value.videoId} />
        );
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

