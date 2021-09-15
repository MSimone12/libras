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
  background: url(${bgMain}) center no-repeat;

  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "video tracker";

  overflow: hidden;

  @media screen and (max-width: 768px) {
    background: url(${bg}) center no-repeat;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    grid-template-areas: "video";
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
    margin-top: 96px;
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

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const RightFrame = styled.div`
  height: 50%;

  margin: 0 0 16px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    background: none;
    height: 90%;
  }
`;

const Hand = styled.img`
  height: 95%;
  @media screen and (max-width: 768px) {
    height: 90%;
  }
`;

const Counter = styled.p`
  color: #c78902;
  font-size: 32px;
  text-transform: uppercase;

  @media screen and (max-width: 768px) {
    position: absolute;

    top: 8px;
  }
`;

const MobileCounter = styled.p`
  @media screen and (max-width: 768px) {
    color: #c78902;
    font-size: 16px;
    text-transform: uppercase;
    position: absolute;
    top: 16px;
    left: calc(50% - 16px);
    right: calc(50% - 16px);
  }
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const LogoContainer = styled.div`
  position: absolute;

  height: 10vh;
  width: 10vh;

  bottom: 10%;

  @media screen and (max-width: 425px) {
    bottom: 20%;
  }
  @media screen and (max-width: 768px) {
    height: 10vw;
    width: 10vw;
    left: 5%;
    bottom: 15%;
  }
  @media screen and (min-width: 769px) {
    right: 5%;
  }
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
    if (counter >= 3) {
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
      <MobileCounter>{counter < 3 ? counter : "MÃO DETECTADA"}</MobileCounter>
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
      </Video>
      <VideoTrack />
      <LogoContainer>
        <Logo fontSize={24} />
      </LogoContainer>
    </>
  );
};

export default VideoPage;
