import * as tf from '@tensorflow/tfjs';
import * as tfd from '@tensorflow/tfjs-data';
const mobileNetModelUrl =
  'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';

import { memo, useEffect, useRef, useState } from 'react';

// components
import Layout from './../../components/Layout';
import SEO from './../../components/SEO';
import TagList from './../../components/TagList';

const IMAGE_SIZE = 224;

async function loadModel() {
  // load a pre-existing model with loadLayersModel
  // https://js.tensorflow.org/api/latest/?_gl=1*kmsiq*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxNDczNTA1Ny4zNS4xLjE3MTQ3MzUwNTcuMC4wLjA.#loadLayersModel
  const mobilenet = await tf.loadLayersModel(mobileNetModelUrl);

  // get a single layer from a model with getLayer
  // https://js.tensorflow.org/api/latest/?_gl=1*kmsiq*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxNDczNTA1Ny4zNS4xLjE3MTQ3MzUwNTcuMC4wLjA.#tf.LayersModel.getLayer
  const layer = mobilenet.getLayer('conv_pw_13_relu');

  // create a "new" model with tf.model
  //https://js.tensorflow.org/api/latest/?_gl=1*kmsiq*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxNDczNTA1Ny4zNS4xLjE3MTQ3MzUwNTcuMC4wLjA.#model
  return tf.model({ inputs: mobilenet.inputs, outputs: layer.output });
}

const ButtonBox = memo(function BtnBx({
  headDirection,
  count,
  enabled,
  onClick,
}) {
  return (
    <section id="centered-wrapper">
      <button
        enabled={enabled}
        className="mx-2 rounded px-5 py-3 min-w-max overflow-hidden shadow relative bg-indigo-500 text-white dark:text-black hover:bg-opacity-90 active:bg-amber-200 transition-colors disabled:bg-indigo-800"
        onClick={onClick}
      >
        {enabled === 'false' && 'Loading the starting model...'}
        {enabled === 'true' && `2. Train ${headDirection} head position`}
      </button>
      <p className="mx-2">Trained Image Count: {count}</p>
    </section>
  );
});

export default function ObjectDetectionPage() {
  const [enableChecked, setEnableChecked] = useState(false);
  const [centerImages, setCenteredImages] = useState(0);
  const [leftImages, setLeftImages] = useState(0);
  const [rightImages, setRightImages] = useState(0);
  const [model, setModel] = useState(null);
  const [detector, setDetector] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [predictionBoxDetails, setPredictionBoxDetails] = useState(null);
  const videoRef = useRef();
  const snapshotCanvasRef = useRef();
  const predictionsRef = useRef();

  function onCheck() {
    setEnableChecked(() => !enableChecked);
  }
  //
  // load the model on start
  //
  useEffect(() => {
    loadModel().then(setModel);
    console.log('model SET!');
  }, []);

  async function startCamera() {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          height: 240,
        },
      })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => videoRef.current.play();
      });
  }

  const tags = [
    'javascript',
    'tensorflowjs',
    'machine learning',
    'react',
    'nextjs',
    'tailwind',
    'object detection',
    'face detection',
  ];

  function clickEnable(e) {
    e.preventDefault();
    startCamera();
  }

  function drawFaceOutline(ctx, faceBox) {
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.strokeRect(
      faceBox.box.xMin,
      faceBox.box.yMin,
      faceBox.box.width,
      faceBox.box.height
    );
  }

  async function clickCapture(e) {
    e.preventDefault();
    const canvasCtx = snapshotCanvasRef.current.getContext('2d');
    canvasCtx.drawImage(videoRef.current, 0, 0, 320, 240);
    predictionsRef.current.appendChild(snapshotCanvasRef.current);
  }

  async function predictFaces() {
    // use the captured photo & the estimated faces
    let estimatedFaces = await detector.estimateFaces(
      snapshotCanvasRef.current,
      {
        flipHorizontal: false,
      }
    );

    //
    // drawing red face-box
    //
    drawFaceOutline(
      snapshotCanvasRef.current.getContext('2d'),
      estimatedFaces[0]
    );
  }

  return (
    <Layout fullHeight>
      <SEO
        title={'Train & Recognize Gestures From Webcam'}
        excerpt={
          'Using Machine Learning with tensorflow js and the coco-ssd model to detect objects in images uploaded to the web'
        }
        slug={`/ml-ui/object-detection-with-uploaded-images`}
        tags={tags}
      />
      <h1>Training & Using A Face-Detection Model</h1>
      <p>
        Train a machine-learning model with your face - teach the model to
        recognize{' '}
        <b>
          <i>YOU!</i>
        </b>
      </p>
      <ul>
        <h3>Teach the computer how to recognize head-tilts:</h3>
        <li>
          <b>Centered:</b> When your head is in its &quot;normal&quot; position
        </li>
        <li>
          <b>Left:</b> When your head is tilted to the left
        </li>
        <li>
          <b>Right:</b> When your head is tilted to the right
        </li>
      </ul>
      <section id="button-box" className="flex flex-wrap">
        <input
          id="webcam-box"
          name="webcam-box"
          checked={enableChecked}
          onChange={onCheck}
          type="checkbox"
          className="rounded px-5 py-3 min-w-max overflow-hidden shadow relative bg-indigo-500 text-white dark:text-black hover:bg-opacity-90"
        ></input>
        <label htmlFor="webcam-box">1. Enable Your Webcam</label>
        <div className="basis-full"></div>

        <ButtonBox
          headDirection={'Centered'}
          count={centerImages}
          enabled={Boolean(model).toString()}
          onClick={() => {
            console.log('CLICKED centered!');
          }}
        />
        <ButtonBox
          headDirection={'Left'}
          count={leftImages}
          enabled={Boolean(model).toString()}
          onClick={() => {
            console.log('CLICKED left!');
          }}
        />
        <ButtonBox
          headDirection={'Right'}
          count={rightImages}
          enabled={Boolean(model).toString()}
          onClick={() => {
            console.log('CLICKED right!');
          }}
        />
      </section>
      <footer className="flex flex-wrap w-full absolute bottom-0">
        {<TagList tags={tags} hideTitle />}
      </footer>
    </Layout>
  );
}