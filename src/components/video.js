import styled from "styled-components";

const VideoContainer = styled.div`
  height: 10vw;
  width: 10vw;

  position: absolute;
  right: 5%;

  border: 5px solid #c78902;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 2px;

  &:after {
    content: "";
    display: block;
    position: absolute;
    background: #080808;
    width: calc(100% + 10px);
    height: 85%;
  }

  @media screen and (max-width: 425px) {
    height: 40vw;
    width: 40vw;

    bottom: 5%;
    right: 5%;
  }
  @media screen and (min-width: 426px) {
    top: 5%;
  }
`;

const Video = styled.video`
  width: 10vw;
  position: relative;
  z-index: 1;
  @media screen and (max-width: 425px) {
    height: 40vw;
    width: 40vw;
  }
`;

const VideoTrack = () => {
  return (
    <VideoContainer>
      <Video id="videotrack" autoPlay playsInline />
    </VideoContainer>
  );
};

export default VideoTrack;
