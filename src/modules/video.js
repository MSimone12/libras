import { useEffect, useState } from "react";
import styled from "styled-components";

import detected from '../assets/first_video.mp4'
import non_detected from '../assets/second_video.mp4'

const Video = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoPlayer = styled.video`
  width: 50%;
  height: 50%;

  @media screen and (max-width: 425px) {
    width: 90%;
  }
`

const videos = {
  'detected': detected,
  'nonDetected': non_detected
}

const VideoPage = ({ hasHand }) => {
  const [currentVideo, setCurrentVideo] = useState(videos.detected)
  const [currentTime, setCurrentTime] = useState(0)

  const toggleVideo = () => {
    setCurrentVideo(current => current === videos.detected ? videos.nonDetected : detected);
  }
  
  useEffect(() => {
    const media = document.getElementById('videoplayer')
    media.addEventListener('timeupdate', () => {
      setCurrentTime(media.currentTime);
    })

  }, [])

  useEffect(() => {
    if (hasHand) {
      toggleVideo()
    }
    
  }, [hasHand])
  
  useEffect(() => {
    const media = document.getElementById('videoplayer')
    media.currentTime = currentTime
  }, [currentVideo])

  return (
    <Video>
      <VideoPlayer id="videoplayer" src={currentVideo} autoPlay='autoplay' />
    </Video>
  )
}

export default VideoPage
