import React from 'react';
import VideoPreview from '../../VideoPreview';

const SuggestedVideosView = (props) => {
  const suggestedVidesNum = props.suggestedVidesNum;
  let suggestedVidesLists = props.videoInfos.map((value, index) => {
    if (index < suggestedVidesNum) {
      return (
        <VideoPreview
          videoInfo={value}
          key={value.videoId} />
      );
    }
  });

  return (
    <ul className="suggested-video-ul">
      {suggestedVidesLists}
    </ul>
  );
};

export default SuggestedVideosView;

