import "./App.css";
import styled from "styled-components";
import IntroPage from "./modules/intro";
import AppRoutes from "./routes";
import { CircularProgress } from "@material-ui/core";

import bg from "./assets/bg.jpg";
import { useCallback, useEffect, useState } from "react";
import { handtrack, init } from "./handtrack";
import VideoPage from "./modules/video";

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  background: url(${bg});
  overflow: hidden;
`;

const Video = styled.video.attrs({ autoplay: "autoplay", id: "videotrack" })`
  height: 15vh !important;
  position: fixed;
  left: 5px;
  bottom: 5px;
  display: hidden;
  border-radius: 10px;
  @media screen and (max-width: 425px) {
    right: 5px;
  }
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.4);
`;

const App = () => {
  const [currentRoute, setCurrentRoute] = useState(AppRoutes.intro);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [detected, setDetected] = useState(false);

  const runDetection = useCallback(
    (video, model) => () => {
      model.detect(video).then((predictions) => {
        setDetected(predictions.some((prediction) => ["open"].includes(prediction.label)));
        requestAnimationFrame(runDetection(video, model));
      });
    },
    []
  );

  const start = useCallback(async () => {
    setLoading(true);
    const video = document.getElementById("videotrack");

    const model = await init();

    const { status } = await handtrack.startVideo(video);

    setLoading(false);

    setStarted(status);

    requestAnimationFrame(runDetection(video, model));
  }, [runDetection]);

  useEffect(() => {
    let timeout;

    if (detected) {
      timeout = setTimeout(() => setCurrentRoute(AppRoutes.video), 3000);
    } else {
      if (timeout) clearTimeout(timeout);
    }
  }, [detected]);

  const loadCurrentRoute = (route) => {
    switch (route) {
      case AppRoutes.intro:
        return <IntroPage started={started} detected={detected} onStart={() => start()} />;

      case AppRoutes.video:
        return <VideoPage hasHand={detected} />;
      default:
        return <IntroPage started={started} detected={detected} onStart={() => start()} />;
    }
  };

  return (
    <>
      <Root>
        {loadCurrentRoute(currentRoute)}
        <Video />
      </Root>
      {loading && (
        <Loader>
          <CircularProgress />
        </Loader>
      )}
    </>
  );
};

export default App;
