import { useEffect, useState } from "react";
import styled from "styled-components";

import detected from "../assets/first_video.mp4";
import non_detected from "../assets/second_video.mp4";
import bgMain from "../assets/bg_main.jpg";
import bg from "../assets/bg.jpg";
import VideoTrack from "../components/video";
import constants from "../constants";
import hands from "../hands";
import Logo from "../components/logo";
import { useHistory } from "react-router";

const getDetectedString = ({ detected }) => (detected ? "ATIVADO" : "DESATIVADO");
const getDetectedBackgroundColor = ({ detected }) => (detected ? "#fff" : "#c78920");
const getDetectedColor = ({ detected }) => (detected ? "#c78920" : "#fff");

const Video = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${bgMain});
  background-size: 100% 100%;
  background-repeat: no-repeat;

  display: grid;
  grid-template-columns: 50% 30% 20%;
  grid-template-rows: 100%;
  grid-template-areas: "video tracker logo";

  @media screen and (max-width: 768px) {
    background: url(${bg}) center no-repeat;
    grid-template-rows: 50% 50%;
    grid-template-columns: 60% 40%;
    grid-template-areas: "video video" "tracker logo";
    overflow: scroll;
  }
`;

const VideoContainer = styled.div`
  grid-area: video;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const VideoPlayerContainer = styled.div`
  width: 80%;
  border: 5px solid ${getDetectedBackgroundColor};
  position: relative;

  @media screen and (max-width: 768px) {
    width: 95%;
    margin-top: 48px;
  }

  &::before {
    @media screen and (max-width: 768px) {
      width: calc(100% + 10px);
      font-size: 16px;
    }
    content: "MODO OUVIR COM AS MÃOS ${getDetectedString}";
    position: absolute;
    z-index: 10;

    top: -32px;
    left: -5px;

    width: 60%;
    height: 40px;

    background-color: ${getDetectedBackgroundColor};

    font-size: 24px;
    color: ${getDetectedColor};

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;
`;

const InstructionsContainer = styled.div`
  width: 80%;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 24px 0 0;

  @media screen and (max-width: 425px) {
    width: 90%;
  }
`;

const InstructionsText = styled.p`
  font-size: 24px;
  color: #fff;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const TrackerContainer = styled.div`
  grid-area: tracker;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const RightFrame = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Hand = styled.img`
  height: 90%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Counter = styled.p`
  color: #c78902;
  font-size: 32px;
  text-transform: uppercase;
`;

const LogoContainer = styled.div`
  grid-area: logo;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  & > * {
    margin: 10%;
  }
`;

const VideoTracker = styled(VideoTrack)`
  position: relative;
  top: unset;
  left: unset;
  right: unset;
  bottom: unset;
`;

const videos = {
  detected: detected,
  nonDetected: non_detected,
};

const VideoPage = ({ started, detected, onInit, onClose }) => {
  const history = useHistory();
  const [currentVideo, setCurrentVideo] = useState(videos.nonDetected);
  const [currentTime, setCurrentTime] = useState(0);
  const [activated, setActivated] = useState(false);
  const [counter, setCounter] = useState(0);
  const [lockDetection, setLockDetection] = useState(false);

  useEffect(() => {
    onInit();
    const media = document.getElementById("videoplayer");
    media.addEventListener("timeupdate", () => {
      setCurrentTime(media.currentTime);
    });

    media.addEventListener("ended", () => {
      history.replace(constants.routes.replay);
    });
  }, [onInit, onClose, history]);

  useEffect(() => {
    let interval;
    if (!lockDetection) {
      interval = setInterval(() => setCounter((count) => count + 1), 1000);

      if (!detected) {
        setCounter(0);
        clearInterval(interval);
      }
    } else {
      if (!detected) setLockDetection(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [detected, lockDetection]);

  useEffect(() => {
    if (counter >= 2) {
      setCounter(0);
      setLockDetection(true);
      setCurrentVideo((current) => (current === videos.detected ? videos.nonDetected : videos.detected));
    }
  }, [counter]);

  useEffect(() => {
    const media = document.getElementById("videoplayer");
    media.currentTime = currentTime;

    setActivated(currentVideo === videos.detected);
  }, [currentVideo]);

  return (
    <>
      <Video>
        <VideoContainer>
          <VideoPlayerContainer detected={activated}>
            <VideoPlayer id="videoplayer" src={currentVideo} autoPlay />
          </VideoPlayerContainer>
          <InstructionsContainer>
            <InstructionsText>{activated ? constants.video.activated : constants.video.deactivated}</InstructionsText>
          </InstructionsContainer>
        </VideoContainer>
        <TrackerContainer>
          <RightFrame>
            <Counter>{counter < 3 ? counter : "MÃO DETECTADA"}</Counter>
            <Hand src={detected ? hands.DETECTED : started ? hands.NOT_DETECTED : hands.DEACTIVATED} />
          </RightFrame>
        </TrackerContainer>
        <LogoContainer>
          <VideoTracker />
          <Logo fontSize={24} />
        </LogoContainer>
      </Video>
    </>
  );
};

export default VideoPage;
