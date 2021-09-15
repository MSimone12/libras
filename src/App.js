import { useCallback, useState } from "react";
import constants from "./constants";
import { Switch, Route, Redirect } from "react-router-dom";
import IntroPage from "./modules/intro";
import LandingPage from "./modules/landing";
import InstructionsPage from "./modules/instructions";
import VideoPage from "./modules/video";
import ReplayPage from "./modules/replay";
import * as Detection from "./detection";

const App = () => {
  const [started, setStarted] = useState(false);
  const [detected, setDetected] = useState(false);

  const init = useCallback(async () => {
    if (!started) {
      const _started = await Detection.init();
      setStarted(_started);
    }
  }, [started]);

  const start = useCallback(async () => {
    const predictions = Detection.startDetection();

    for await (let prediction of predictions) {
      if (prediction != null) {
        setDetected(
          prediction.some((prediction) => prediction.label === "open")
        );
      }
    }
  }, [started]);

  const stop = useCallback(() => Detection.dispose(), []);

  return (
    <Switch>
      <Route exact path={constants.routes.landing} component={LandingPage} />
      <Route path={constants.routes.intro} component={IntroPage} />
      <Route path={constants.routes.replay} component={ReplayPage} />
      <Route path={constants.routes.instructions}>
        <InstructionsPage
          started={started}
          detected={detected}
          onInit={init}
          onStartDetection={start}
        />
      </Route>
      <Route path={constants.routes.video}>
        <VideoPage
          onInit={init}
          onStartDetection={start}
          onClose={stop}
          hasHand={started && detected}
        />
      </Route>
      <Redirect to={constants.routes.landing} />
    </Switch>
  );
};

export default App;
