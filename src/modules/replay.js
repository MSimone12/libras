import styled from "styled-components";
import bgIntro from "../assets/bg_intro.jpg";
import bg from "../assets/bg.jpg";
import Button from "../components/button";
import { useHistory } from "react-router";
import constants from "../constants";
import { useEffect } from "react";

const Intro = styled.div`
  width: 100%;
  height: 100vh;

  background-image: url(${bgIntro});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;

  @media screen and (max-width: 768px) {
    background: url(${bg}) center;
    grid-template-columns: 100%;
    grid-template-rows: 50% 50%;

    overflow-y: scroll;
  }
`;

const LeftContainer = styled.div`
  padding: 10%;

  display: grid;
  grid-template-rows: 3fr 2fr;
  grid-template-columns: 1fr;
  grid-template-areas: "title" "description";

  @media screen and (max-width: 768px) {
    padding: 5%;
  }
`;

const LeftTitleContainer = styled.div`
  grid-area: title;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-evenly;
`;

const LeftTitle = styled.p`
  font-size: 80px;
  color: #fff;
  letter-spacing: 72px;
  line-height: 62px;
  background: #c78902;
  padding: 5px;
  margin: 0 0 16px 0;

  @media screen and (max-width: 768px) {
    font-size: 48px;
    letter-spacing: 40px;
    line-height: 32px;
  }
`;

const LeftDescriptionContainer = styled.div`
  grid-area: description;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const LeftDescription = styled.p`
  font-size: 2rem;
  color: #fff;
  text-transform: uppercase;
`;

const RightContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

const RightDescriptionContainer = styled.div`
  width: 100%;
  height: 100%;

  padding: 0 64px 64px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding: 0 16px 16px 0;
  }
`;

const RightButtonContainer = styled.div``;

const SizedBox = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
`;

const RightDescription = styled.p`
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 9.3px;

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
    letter-spacing: 0.3rem;
  }
`;

const ReplayPage = ({ onInit }) => {
  useEffect(() => {
    onInit(true);
  }, [onInit]);

  const history = useHistory();
  return (
    <Intro>
      <LeftContainer>
        <LeftTitleContainer>
          <LeftTitle>{"OUÇA"}</LeftTitle>
          <LeftTitle>{"COM"}</LeftTitle>
          <LeftTitle>{"AS"}</LeftTitle>
          <LeftTitle>{"MÃOS"}</LeftTitle>
        </LeftTitleContainer>
        <LeftDescriptionContainer>
          <LeftDescription>{"No Brasil, apenas 1%"}</LeftDescription>
          <LeftDescription>{"dos sites são acessiveis"}</LeftDescription>
          <SizedBox height={16} />
          <LeftDescription>{"Acesse o da Chevrolet"}</LeftDescription>
          <LeftDescription>{"e conheça a Maya"}</LeftDescription>
          <LeftDescription>{"Nossa tradutora virtual"}</LeftDescription>
          <LeftDescription>{"de Libras."}</LeftDescription>
        </LeftDescriptionContainer>
      </LeftContainer>
      <RightContainer>
        <RightDescriptionContainer>
          <div>
            <RightDescription>{"Quer ouvir mais uma vez?"}</RightDescription>
          </div>
          <SizedBox height={16} />
          <RightButtonContainer>
            <Button label={"Ouvir novamente"} onClick={() => history.replace(constants.routes.instructions.first)} />
          </RightButtonContainer>
        </RightDescriptionContainer>
      </RightContainer>
    </Intro>
  );
};

export default ReplayPage;
