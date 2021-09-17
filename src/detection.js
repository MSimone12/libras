import Webcam from "webcam-easy";
import * as handtrack from "handtrackjs";

const modelParams = {
  flipHorizontal: true,
  maxNumBoxes: 20,
  iouThreshold: 0.5,
  scoreThreshold: 0.8,
};

export const webcamEl = () => document.getElementById("videotrack");

let model;

let webcam;

export const init = async () => {
  webcam = new Webcam(webcamEl(), "user");

  await webcam.start();

  model = await handtrack.load(modelParams);

  return true;
};

export const startDetection = (setPredictions) => async () => {
  try {
    const predictions = await model.detect(webcamEl());
    setPredictions(predictions);
  } catch (error) {}

  requestAnimationFrame(startDetection(setPredictions));
};

export const dispose = async () => {
  model?.dispose();
  webcam?.stop();
};
