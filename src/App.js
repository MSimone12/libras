import { useCallback, useEffect, useState } from "react";
import constants from "./constants";
import { Switch, Route, Redirect } from "react-router-dom";
import IntroPage from "./modules/intro";
import LandingPage from "./modules/landing";
import InstructionsPage from "./modules/instructions";
import VideoPage from "./modules/video";
import ReplayPage from "./modules/replay";
import * as Detection from "./detection";
import FirstInstructionsPage from "./modules/first_instructions";
import styled from "styled-components";

const AppContainer = styled.div`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

const App = () => {
  const [started, setStarted] = useState(false);
  const [detected, setDetected] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
  }, []);

  const start = useCallback(async (started) => {
    if (started) {
      const detection = Detection.startDetection((pred) => setDetected(pred.some((prediction) => prediction.label === "open")));

      await detection();
    }
  }, []);

  const init = useCallback(async () => {
    if (!started) {
      const _started = await Detection.init();
      setStarted(_started);
    }
  }, [started]);

  useEffect(() => {
    console.log(started);
    start(started);
  }, [started, start]);

  const close = useCallback(async (force) => {
    setStarted(false);
    if (force) {
      await Detection.dispose();
    }
  }, []);

  return (
    <AppContainer width={dimensions.width} height={dimensions.height}>
      <Switch>
        <Route exact path={constants.routes.landing} component={LandingPage} />
        <Route path={constants.routes.intro} component={IntroPage} />
        <Route path={constants.routes.replay}>
          <ReplayPage onInit={close} />
        </Route>
        <Route path={constants.routes.instructions.first}>
          <FirstInstructionsPage started={started} detected={detected} onInit={init} close={close} />
        </Route>
        <Route path={constants.routes.instructions.second}>
          <InstructionsPage started={started} detected={detected} onInit={init} close={close} />
        </Route>
        <Route path={constants.routes.video}>
          <VideoPage onInit={init} started={started} detected={detected} onClose={close} />
        </Route>
        <Redirect to={constants.routes.landing} />
      </Switch>
    </AppContainer>
  );
};

export default App;
