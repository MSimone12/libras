import { useEffect, useState } from "react";
import styled from "styled-components";

import frame from "../assets/frame.png";
import bgMain from "../assets/bg_main.jpg";
import bg from "../assets/bg.jpg";
import first from "../assets/icones/1.png";
import second from "../assets/icones/2.png";
import third from "../assets/icones/3.png";
import fourth from "../assets/icones/4.png";
import fifth from "../assets/icones/5.png";
import hands from "../hands";
import VideoTrack from "../components/video";
import { useHistory } from "react-router";
import constants from "../constants";
import Logo from "../components/logo";

const instructions = [first, second, third, fourth, fifth];

const Instructions = styled.div`
  width: 100vw;
  height: 100vh;

  background: url(${bgMain}) center no-repeat;

  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "instructions detection empty";

  @media screen and (max-width: 768px) {
    background: url(${bg}) center no-repeat;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "instructions" "detection";
    overflow-y: scroll;
  }
`;

const LeftContainer = styled.div`
  grid-area: instructions;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const InstructionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  padding: 16px;
`;

const Title = styled.p`
  color: #fff;
  background-color: #c78902;
  text-transform: uppercase;
  font-size: calc((100vw / 3) / 10);
  letter-spacing: calc((100vw / 3) / 24);
  padding-left: calc((100vw / 3) / 24);

  @media screen and (max-width: 768px) {
    font-size: calc(100vw / 10);
    letter-spacing: calc(100vw / 24);
    padding-left: calc(100vw / 24);
  }
`;

const InstructionImg = styled.img`
  width: 50%;
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
  background: url(${frame}) center no-repeat;
  width: 100%;
  height: 100%;

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
`;

const LogoContainer = styled.div`
  position: absolute;
  bottom: 10%;

  height: 10vh;
  width: 10vh;

  @media screen and (max-width: 768px) {
    height: 10vw;
    width: 10vw;
    left: 8%;
  }
  @media screen and (min-width: 769px) {
    right: 8%;
  }
`;

const InstructionsPage = ({ started, detected, onInit, onStartDetection }) => {
  const history = useHistory();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    onInit();
  }, [onInit]);

  useEffect(() => {
    if (started) onStartDetection();
  }, [started]);

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
    if (counter === 3) {
      history.replace(constants.routes.video);
    }
  }, [counter, history]);

  return (
    <>
      <Instructions>
        <LeftContainer>
          <Title>{"Instruções"}</Title>
          <InstructionsContainer>
            {instructions.map((src, index) => (
              <InstructionImg src={src} alt="" key={index} />
            ))}
          </InstructionsContainer>
        </LeftContainer>
        <RightContainer>
          <RightFrame>
            <Counter>{counter < 3 ? counter : "Mão Detectada"}</Counter>
            <Hand
              alt=""
              src={
                started
                  ? detected
                    ? hands.DETECTED
                    : hands.NOT_DETECTED
                  : hands.DEACTIVATED
              }
            />
          </RightFrame>
        </RightContainer>
      </Instructions>
      <VideoTrack />
      <LogoContainer>
        <Logo fontSize={24} />
      </LogoContainer>
    </>
  );
};

export default InstructionsPage;
