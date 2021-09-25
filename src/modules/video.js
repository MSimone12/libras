import { useEffect, useState } from "react";
import styled from "styled-components";

import non_detected from "../assets/video-modo-ativo.mp4";
import detected from "../assets/video-modo-desligado.mp4";
import VideoTrack from "../components/video";
import constants from "../constants";
import hands from "../hands";
import Logo from "../components/logo";
import { useHistory } from "react-router";

import bg from "../assets/bg.png";

const getDetectedString = ({ detected }) => (detected ? "LIBRAS" : "CANTADO");
const getDetectedBackgroundColor = ({ detected }) => (detected ? "#fff" : "#c78920");
const getDetectedColor = ({ detected }) => (detected ? "#c78920" : "#fff");

const Video = styled.div`
  height: 100%;
  width: 100%;

  display: grid;
  grid-template-columns: 70% 15% 15%;
  grid-template-rows: 100%;
  grid-template-areas: "video tracker logo";

  background-image: url(${bg});
  background-position: center;
  background-size: cover;

  @media screen and (max-width: 768px) {
    background: none;
    grid-template-rows: 55% 45%;
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
    content: "MODO ${getDetectedString} ATIVADO";
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
  border: none;
`;

const InstructionsContainer = styled.div`
  width: 80%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 24px 0 0;

  @media screen and (max-width: 425px) {
    width: 90%;
  }
`;

const InstructionsText = styled.p`
  font-size: 18px;
  color: #fff;
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Highlight = styled.span`
  color: #c78920;
`;

const TrackerContainer = styled.div`
  grid-area: tracker;

  width: 100%;
  height: 100%;
`;

const RightFrame = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const Hand = styled.img`
  height: auto;
  justify-self: flex-end;

  @media screen and (max-width: 768px) {
    height: 80%;
  }
  @media screen and (min-width: 769px) {
    width: 100%;
  }
`;

const Counter = styled.p`
  color: #c78902;
  font-size: 20px;
  text-transform: uppercase;
  text-align: center;
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
  detected: non_detected,
  nonDetected: detected,
};

const VideoPage = ({ started, detected, onInit, onClose }) => {
  const history = useHistory();
  const [lockDetection, setLockDetection] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(videos.detected);
  const [currentTime, setCurrentTime] = useState(0);
  const [activated, setActivated] = useState(false);

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
      interval = setTimeout(() => {
        setLockDetection(true);
        setCurrentVideo((current) => (current === videos.detected ? videos.nonDetected : videos.detected));
      }, 1000);

      if (!detected) {
        clearTimeout(interval);
      }
    } else {
      if (!detected) setLockDetection(false);
    }

    return () => {
      clearTimeout(interval);
    };
  }, [detected, lockDetection]);

  useEffect(() => {
    const media = document.getElementById("videoplayer");
    media.currentTime = currentTime;

    setActivated(currentVideo === videos.detected);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideo]);

  return (
    <>
      <Video>
        <VideoContainer>
          <VideoPlayerContainer detected={activated}>
            <VideoPlayer
              className="q-video"
              data-dtm="hands-on"
              id="videoplayer"
              src={currentVideo}
              autoPlay
              playsInline
              preload="auto"
              muted={false}
              controls
            />
          </VideoPlayerContainer>
          <InstructionsContainer>
            <InstructionsText>Para alternar entre as versões do clipe, mostre a mão para a câmera.</InstructionsText>
            <InstructionsText>
              <Highlight>Caso o vídeo não comece automaticamente, aperte o play.</Highlight>
            </InstructionsText>
          </InstructionsContainer>
        </VideoContainer>
        <TrackerContainer>
          <RightFrame>
            <Counter>{detected ? "MÃO DETECTADA" : "MÃO NÃO DETECTADA"}</Counter>
            <Hand src={detected ? hands.DETECTED : started ? hands.NOT_DETECTED : hands.DEACTIVATED} />
          </RightFrame>
        </TrackerContainer>
        <LogoContainer>
          <VideoTracker />
          <Logo fontSize={18} />
        </LogoContainer>
      </Video>
    </>
  );
};

export default VideoPage;
