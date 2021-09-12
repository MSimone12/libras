import { useEffect, useState } from "react";
import * as handtrack from "handtrackjs";
import Webcam from "webcam-easy";
import constants from "./constants";
import { Switch, Route, Redirect } from "react-router-dom";
import IntroPage from "./modules/intro";
import LandingPage from "./modules/landing";
import InstructionsPage from "./modules/instructions";
import { modelParams } from "./handtrack";

const startWebcam = async (webcamElement) => {
  const webcam = new Webcam(webcamElement, "user");

  await webcam.start();

  return webcam;
};

let webcam;

const App = () => {
  const [started, setStarted] = useState(false);
  const [detected, setDetected] = useState(false);

  const startDetection = (model, element) => async () => {
    const predictions = await model.detect(element);

    setDetected(predictions.some((prediction) => prediction.label === "open"));

    requestAnimationFrame(startDetection(model, element));
  };

  const start = async () => {
    const webcamEl = document.getElementById("videotrack");
    webcam = await startWebcam(webcamEl);
    const model = await handtrack.load(modelParams);

    setStarted(true);
    await startDetection(model, webcamEl)();
  };

  useEffect(() => {
    return () => {
      webcam?.stop();
    };
  }, []);

  return (
    <Switch>
      <Route exact path={constants.routes.landing} component={LandingPage} />
      <Route path={constants.routes.intro} component={IntroPage} />
      <Route path={constants.routes.instructions}>
        <InstructionsPage
          started={started}
          detected={detected}
          onInit={start}
        />
      </Route>
      <Redirect to={constants.routes.landing} />
    </Switch>
  );
};

export default App;
