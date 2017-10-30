import React from 'react';
import VideoPreview from '../../VideoPreviewComponent';

const SuggestedVideosView = (props) => {
  let suggestedVideosLists = props.videoInfos.map((value, index) => {
    if (index < props.suggestedVideosNum) {
      return (
        <VideoPreview
          videoInfo={value}
          key={value.videoId}
          addViewNum={props.addViewNum} />
      );
    }
  });

  return (
    <ul className="suggested-video-ul">
      {suggestedVideosLists}
    </ul>
  );
};

export default SuggestedVideosView;

