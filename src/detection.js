import Webcam from "webcam-easy";
import * as handtrack from "handtrackjs";

const modelParams = {
  flipHorizontal: true,
  maxNumBoxes: 20,
  iouThreshold: 0.5,
  scoreThreshold: 0.8,
};

const _model = handtrack.load(modelParams);

let webcam;

export const init = async () => {
  const webcamEl = document.getElementById("videotrack");

  webcam = new Webcam(webcamEl, "user");

  await webcam.start();

  return true;
};

export async function* startDetection() {
  const model = await _model;
  const webcamEl = document.getElementById("videotrack");
  const predictions = await model.detect(webcamEl);
  console.log(predictions);
  yield predictions;

  yield* startDetection();
}

export const dispose = async () => {
  const model = await _model;
  model.dispose();
  webcam.stop();
};
