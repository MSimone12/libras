import { useEffect, useState } from "react";
import styled from "styled-components";

import hands from "../hands";
import VideoTrack from "../components/video";
import { useHistory } from "react-router";
import constants from "../constants";
import Logo from "../components/logo";

import bgIntro from "../assets/bg_main.png";

const getCounterDetectedColor = ({ started, detected }) => (started ? (detected ? "#009900" : "#990000") : "#c78920");

const Instructions = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 20% 1fr 20%;
  grid-template-rows: 100%;
  grid-template-areas: "instructions detection logo";

  background-image: url(${bgIntro});
  background-repeat: no-repeat;
  background-size: 100% 100%;

  @media screen and (max-width: 768px) {
    background: none;
    grid-template-columns: 100%;
    grid-template-rows: 30% 30% 40%;
    grid-template-areas: "logo" "instructions" "detection";
  }
`;

const InstructionsContainer = styled.div`
  grid-area: instructions;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  @media screen and (min-width: 769px) {
    height: 95%;
  }

  @media screen and (max-width: 768px) {
    height: 100%;
  }
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

const InstructionTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  padding: 0 16px;

  @media screen and (max-width: 768px) {
    padding: 0 4px;
  }
`;

const HelpText = styled.p`
  text-align: left;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  word-spacing: 5px;
  margin: 0;
  padding: 0;
  letter-spacing: 3px;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Highlight = styled.span`
  color: #c78920;
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
        <InstructionsContainer>
          <InstructionTextContainer>
            <HelpText>
              <Highlight>VAMOS LA?</Highlight>
            </HelpText>
            <HelpText>COLOQUE A MÃO</HelpText>
            <HelpText>A UNS 15 CM DA CÂMERA</HelpText>
            <HelpText>PARA UM MELHOR</HelpText>
            <HelpText>RECONHECIMENTO</HelpText>
          </InstructionTextContainer>
        </InstructionsContainer>
        <RightContainer>
          <RightFrame>
            <Counter started={started} detected={detected}>
              {counter < 2 ? counter : "Mão Detectada"}
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
