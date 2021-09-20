import React from "react";
import styled from "styled-components";
import bg from "../assets/bg.png";
import constants from "../constants";
import Button from "../components/button";
import { useHistory } from "react-router";

const Landing = styled.div`
  width: 100vw;
  height: 100%;
  background: url(${bg}) center no-repeat;
  background-size: 100% 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  width: 50%;
  height: 50%;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-evenly;

  @media screen and (max-width: 768px) {
    width: 90%;
    height: 100%;
  }
`;

const LandingText = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  word-spacing: 5px;
  margin: 0;
  padding: 0;
  line-height: 2rem;
`;

const LandingPage = () => {
  const history = useHistory();

  return (
    <Landing>
      <TextContainer>
        <div>
          {constants.landing.text.split("\n").map((e, i) => (
            <>
              <LandingText key={i}>{e}</LandingText>
              <br />
            </>
          ))}
        </div>
        <Button label={"Começar"} secondary onClick={() => history.replace(constants.routes.intro)} />
      </TextContainer>
    </Landing>
  );
};

export default LandingPage;
