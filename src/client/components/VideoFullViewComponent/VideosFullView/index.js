import React from 'react';
import VideoPreview from '../../VideoPreviewComponent';

const VideosFullView = (props) => {
  let suggestedVideosLists = props.videoInfos.map((value, index) => {
    return (
      <VideoPreview
        videoInfo={value}
        key={value.videoId} />
    );
  });

  return (
    <div className="suggested-video-ul">
      {suggestedVideosLists}
    </div>
  );
};

export default VideosFullView;

