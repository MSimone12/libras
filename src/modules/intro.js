import styled from "styled-components";
import Button from "../components/button";
import { useHistory } from "react-router";
import constants from "../constants";

import bgIntro from "../assets/bg_intro.png";

const Intro = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;

  background-image: url(${bgIntro});
  background-repeat: no-repeat;
  background-size: cover;

  @media screen and (max-width: 768px) {
    background: none;
    grid-template-columns: 100%;
    grid-template-rows: 70% 30%;

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

  @media screen and (max-width: 768px) {
    align-items: center;
    justify-content: flex-start;
  }
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
    align-items: center;
    justify-content: center;
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

const IntroPage = ({ buttonLabel }) => {
  const history = useHistory();
  return (
    <Intro>
      <LeftContainer>
        <LeftTitleContainer>
          <LeftTitle>{"OU??A"}</LeftTitle>
          <LeftTitle>{"COM"}</LeftTitle>
          <LeftTitle>{"AS"}</LeftTitle>
          <LeftTitle>{"M??OS"}</LeftTitle>
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
            <RightDescription>{"Para ouvir a nova m??sica"}</RightDescription>
            <RightDescription>{"da melim, use suas m??os."}</RightDescription>
          </div>
          <SizedBox height={16} />
          <RightButtonContainer>
            <Button
              dtm="use your hands"
              label={"Come??ar a ouvir com as m??os"}
              onClick={() => history.replace(constants.routes.instructions.first)}
            />
          </RightButtonContainer>
        </RightDescriptionContainer>
      </RightContainer>
    </Intro>
  );
};

export default IntroPage;
