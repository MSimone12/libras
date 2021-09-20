import { useEffect, useState } from "react";
import styled from "styled-components";

import bgMain from "../assets/bg_main.jpg";
import bg from "../assets/bg.png";
import hands from "../hands";
import VideoTrack from "../components/video";
import { useHistory } from "react-router";
import constants from "../constants";
import Logo from "../components/logo";

const getCounterDetectedColor = ({ started, detected }) => (started ? (detected ? "#009900" : "#990000") : "#c78920");

const Instructions = styled.div`
  width: 100vw;
  height: 100%;

  background-image: url(${bgMain});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  display: grid;
  grid-template-columns: 80% 20%;
  grid-template-rows: 100%;
  grid-template-areas: "detection logo";

  /* overflow: hidden; */

  @media screen and (max-width: 768px) {
    background: url(${bg}) center no-repeat;
    grid-template-columns: 1fr;
    grid-template-rows: 30% 70%;
    grid-template-areas: "logo" "detection";
    overflow-y: scroll;
  }
`;

const RightContainer = styled.div`
  grid-area: detection;

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
  justify-content: flex-end;
`;

const Hand = styled.img`
  height: 95%;
`;

const Counter = styled.p`
  color: ${getCounterDetectedColor};
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

  @media screen and (max-width: 768px) {
    flex-direction: row;
  }
`;

const Video = styled(VideoTrack)`
  position: relative;
  top: unset;
  left: unset;
  right: unset;
  bottom: unset;
`;

const InstructionsPage = ({ started, detected, onInit, close }) => {
  const history = useHistory();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    onInit();
  }, [onInit]);

  useEffect(() => {
    const interval = setInterval(() => setCounter((old) => old + 1), 1000);
    if (!detected) {
      setCounter(0);
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [detected]);

  useEffect(() => {
    if (counter === 2) {
      close();
      history.replace(constants.routes.video);
    }
  }, [counter, history, close]);

  return (
    <>
      <Instructions>
        <RightContainer>
          <RightFrame>
            <Counter started={started} detected={detected}>
              {counter < 3 ? counter : "Mão Detectada"}
            </Counter>
            <Hand alt="" src={started ? (detected ? hands.DETECTED : hands.NOT_DETECTED) : hands.DEACTIVATED} />
          </RightFrame>
        </RightContainer>
        <LogoContainer>
          <Video />
          <Logo fontSize={24} />
        </LogoContainer>
      </Instructions>
    </>
  );
};

export default InstructionsPage;
