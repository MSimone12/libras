import styled from "styled-components";

import first from "../assets/icones/1.png";
import second from "../assets/icones/2.png";
import third from "../assets/icones/3.png";
import fourth from "../assets/icones/4.png";
import { useHistory } from "react-router";
import constants from "../constants";
import Logo from "../components/logo";
import Button from "../components/button";

import bgIntro from "../assets/bg_main.png";

const instructions = [first, second, third, fourth];

const Instructions = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 80% 20%;
  grid-template-rows: 80% 20%;
  grid-template-areas: "instructions instructions" "button logo";

  background-image: url(${bgIntro});
  background-repeat: no-repeat;
  background-size: 100% 100%;

  @media screen and (max-width: 768px) {
    background: none;
    grid-template-columns: 50% 50%;
    grid-template-rows: 80% 20%;
    grid-template-areas: "instructions instructions" "logo button";
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

  word-wrap: break-word;
`;

const InstructionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
`;

const Title = styled.p`
  color: #fff;
  background-color: #c78902;
  text-transform: uppercase;
  font-size: calc((100vw / 3) / 10);
  letter-spacing: calc((100vw / 3) / 25);
  padding-left: calc((100vw / 3) / 25);

  @media screen and (max-width: 768px) {
    font-size: calc(100vw / 10);
    letter-spacing: calc(100vw / 25);
    padding-left: calc(100vw / 25);
  }
`;

const InstructionImg = styled.img`
  @media screen and (min-width: 426px) {
    height: 12vw;
  }
  @media screen and (max-width: 425px) {
    width: 40%;
  }
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
    margin: auto;
  }

  @media screen and (max-width: 768px) {
    flex-direction: row;
  }
`;

const ButtonContainer = styled.div`
  grid-area: button;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const FirstInstructionsPage = () => {
  const history = useHistory();

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
        <LogoContainer>
          <Logo fontSize={18} />
        </LogoContainer>
        <ButtonContainer>
          <Button dtm="instructions" label={"Continuar"} onClick={() => history.replace(constants.routes.video)} />
        </ButtonContainer>
      </Instructions>
    </>
  );
};

export default FirstInstructionsPage;
