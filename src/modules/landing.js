import React from "react";
import styled from "styled-components";
import constants from "../constants";
import Button from "../components/button";
import { useHistory } from "react-router";

import bg from "../assets/bg.png";

const Landing = styled.div`
  width: 100%;
  height: 100%;

  background-image: url(${bg});
  background-position: center;
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    background: none;
  }
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
  line-height: 4rem;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
    line-height: 2rem;
  }
`;

const Highlight = styled.span`
  color: #c78920;
`;

const SizedBox = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
`;

const LandingPage = () => {
  const history = useHistory();

  return (
    <Landing>
      <TextContainer>
        <div>
          <LandingText>NO BRASIL, HÁ MAIS DE 10 MILHÕES DE SURDOS.</LandingText>
          <LandingText>E É COM AS MÃOS QUE ELES OUVEM O MUNDO, ATRAVÉS</LandingText>
          <LandingText>
            DA <Highlight>LIBRAS</Highlight>.
          </LandingText>
          <SizedBox height={32} />
          <LandingText>AGORA VOCÊ PODE OUVIR O NOVO SUCESSO</LandingText>
          <LandingText>
            DA <Highlight>MELIM</Highlight> ASSIM TAMBÉM.
          </LandingText>
          <SizedBox height={32} />
        </div>
        <Button dtm="intro" label={"Próximo"} onClick={() => history.replace(constants.routes.intro)} />
      </TextContainer>
    </Landing>
  );
};

export default LandingPage;
