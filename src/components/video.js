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
    width: calc(100% + 12px);
    height: 85%;
  }

  @media screen and (max-width: 425px) {
    height: 40vw;
    width: 40vw;
  }
  @media screen and (max-width: 768px) {
    height: 20vw;
    width: 20vw;

    bottom: 5%;
  }
  @media screen and (min-width: 769px) {
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
  @media screen and (max-width: 768px) {
    height: 20vw;
    width: 20vw;
  }
`;

const VideoTrack = ({ className }) => {
  return (
    <VideoContainer className={className}>
      <Video id="videotrack" autoPlay playsInline />
    </VideoContainer>
  );
};

export default VideoTrack;
