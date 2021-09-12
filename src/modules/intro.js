import styled from "styled-components";
import bgIntro from "../assets/bg_intro.jpg";
import bg from "../assets/bg.jpg";
import Button from "../components/button";
import { useHistory } from "react-router";
import constants from "../constants";

const Intro = styled.div`
  width: 100vw;
  height: 100vh;

  background-image: url(${bgIntro});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;

  @media screen and (max-width: 768px) {
    background: url(${bg}) center;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;

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
    padding: 0;
    align-items: flex-start;
  }
`;

const RightButtonContainer = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

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

const IntroPage = () => {
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
          <LeftDescription>{"Um novo sucesso"}</LeftDescription>
          <LeftDescription>{"para todos."}</LeftDescription>
          <LeftDescription>{"Todos mesmo."}</LeftDescription>
        </LeftDescriptionContainer>
      </LeftContainer>
      <RightContainer>
        <RightDescriptionContainer>
          <div>
            <RightDescription>{"Para ouvir a nova música"}</RightDescription>
            <RightDescription>{"da melim, use suas mãos."}</RightDescription>
          </div>
          <SizedBox height={16} />
          <RightButtonContainer>
            <Button
              label={"Começar a ouvir com as mãos"}
              onClick={() => history.replace(constants.routes.instructions)}
            />
          </RightButtonContainer>
        </RightDescriptionContainer>
      </RightContainer>
    </Intro>
  );
};

export default IntroPage;
