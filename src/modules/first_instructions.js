import styled from "styled-components";

import bgMain from "../assets/bg_main.jpg";
import bg from "../assets/bg.png";
import first from "../assets/icones/1.png";
import second from "../assets/icones/2.png";
import third from "../assets/icones/3.png";
import fourth from "../assets/icones/4.png";
import fifth from "../assets/icones/5.png";
import { useHistory } from "react-router";
import constants from "../constants";
import Logo from "../components/logo";
import Button from "../components/button";

const instructions = [first, second, third, fourth, fifth];

const Instructions = styled.div`
  width: 100vw;
  height: 100%;

  background-image: url(${bgMain});
  background-size: 100% 100%;

  display: grid;
  grid-template-columns: 80% 20%;
  grid-template-rows: 100%;
  grid-template-areas: "instructions logo";

  @media screen and (max-width: 768px) {
    background: url(${bg}) center no-repeat;
    grid-template-columns: 100%;
    grid-template-rows: 80% 20%;
    grid-template-areas: "instructions" "logo";
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
  justify-content: center;
  flex-wrap: wrap;
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
  width: 20vw;

  @media screen and (max-width: 425px) {
    width: 50%;
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
    margin: 10%;
  }

  @media screen and (max-width: 768px) {
    flex-direction: row;
  }
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
          <Logo fontSize={24} />
          <Button label={"Continuar"} onClick={() => history.replace(constants.routes.instructions.second)} />
        </LogoContainer>
      </Instructions>
    </>
  );
};

export default FirstInstructionsPage;
