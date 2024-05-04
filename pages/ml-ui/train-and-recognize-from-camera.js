import * as tf from '@tensorflow/tfjs';
import * as tfd from '@tensorflow/tfjs-data';
const mobileNetModelUrl =
  'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';

import { useCallback, useEffect, useRef, useState } from 'react';

// components
import Layout from './../../components/Layout';
import SEO from './../../components/SEO';
import TagList from './../../components/TagList';

import { MemoCheckbox } from '../../components/MemoCheckbox';
import { ButtonBox } from '../../components/MemoMlButtonBox';
import { Loader } from '../../components/Loader';

const learningRate = 0.0001;
const batchSizeFraction = 0.4;
const epochs = 30;
const denseUnitCount = 100;

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

// TODO:
/*
  - ASYNC getImage fn
  - predict "example" var
  - creat tensor
  - oneHotFromLabel
*/
const delay = () => new Promise((resolve) => setTimeout(resolve, 0));

const imagesByIndex = ['center', 'left', 'right'];

function buildModelLayers(inputModel) {
  // LAYERS
  // https://js.tensorflow.org/api/latest/?_gl=1*kmsiq*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxNDczNTA1Ny4zNS4xLjE3MTQ3MzUwNTcuMC4wLjA.#Layers

  // flatten
  // flattens each batch in its inputs to 1D (making the output 2D)
  // https://js.tensorflow.org/api/latest/?_gl=1*kmsiq*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxNDczNTA1Ny4zNS4xLjE3MTQ3MzUwNTcuMC4wLjA.#layers.flatten
  const l1 = tf.layers.flatten({
    inputShape: inputModel.outputs[0].shape.slice(1),
  });

  // dense
  /*
    This layer implements the operation: output = activation(dot(input, kernel) + bias)
    - activation is the element-wise activation function passed as the activation argument.
    - kernel is a weights matrix created by the layer.
    - bias is a bias vector created by the layer (only applicable if useBias is true).
  */
  // https://js.tensorflow.org/api/latest/?_gl=1*kmsiq*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxNDczNTA1Ny4zNS4xLjE3MTQ3MzUwNTcuMC4wLjA.#layers.dense
  const l2 = tf.layers.dense({
    units: denseUnitCount,
    activation: 'relu',
    kernelInitializer: 'varianceScaling',
    useBias: true,
  });

  const l3 = tf.layers.dense({
    units: imagesByIndex.length,
    kernelInitializer: 'varianceScaling',
    useBias: true,
    activation: 'softmax',
  });

  return [l1, l2, l3];
}
export default function TrainAndRecognizeFromCameraPage() {
  const [detectedPosition, setDetectedPosition] = useState(null);
  const [runDetections, setRunDetections] = useState(false);
  const [training, setTraining] = useState(false);
  const [enableChecked, setEnableChecked] = useState(false);
  const [centerImages, setCenterImages] = useState(0);
  const [leftImages, setLeftImages] = useState(0);
  const [rightImages, setRightImages] = useState(0);
  const [startingModel, setStartingModel] = useState(null);
  const [myTrainedModel, setMyTrainedModel] = useState(null);
  const [tfWebcam, setTfWebcam] = useState(null);
  const webcamRef = useRef();
  const [predictedHeadPosition, setPredictedHeadPosition] = useState(null);
  const [predictionCount, setPredictionCount] = useState(0);
  const [mousedown, setMousedown] = useState(false);
  const xs = useRef();
  const xy = useRef();

  async function onCheck() {
    let w = await tfd.webcam(webcamRef.current);
    setEnableChecked(() => !enableChecked);
    setTfWebcam(w);
  }
  //
  // load the model on start
  //
  useEffect(() => {
    loadModel().then(setStartingModel);
  }, []);

  const loopAndRecordImages = useCallback(
    async function loopAndSetFn(mouseDownVal) {
      await delay();

      // getImage
      const webcamImg = await tfWebcam.capture();
      const processedImg = tf.tidy(() =>
        webcamImg.expandDims(0).toFloat().div(127).sub(1)
      );

      // predict & more tf work...
      let startingModelPrediction = startingModel.predict(processedImg);
      // createATensor with tensor1d
      // https://js.tensorflow.org/api/latest/?_gl=1*kmsiq*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxNDczNTA1Ny4zNS4xLjE3MTQ3MzUwNTcuMC4wLjA.#tensor1d
      const indexVal = imagesByIndex.indexOf(mouseDownVal);
      const tensorInt = tf.tensor1d([indexVal]).toInt();

      // create a one-hot tensor with oneHot
      // https://js.tensorflow.org/api/latest/?_gl=1*kmsiq*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxNDczNTA1Ny4zNS4xLjE3MTQ3MzUwNTcuMC4wLjA.#oneHot
      const oneHotFromLabel = tf.oneHot(tensorInt, imagesByIndex.length);

      // run & cleanup with tidy
      // https://js.tensorflow.org/api/latest/?_gl=1*kmsiq*_ga*MjE0MTk0MTMyOC4xNzEwNjE4Njcy*_ga_W0YLR4190T*MTcxNDczNTA1Ny4zNS4xLjE3MTQ3MzUwNTcuMC4wLjA.#tidy
      const y = tf.tidy(() => oneHotFromLabel);

      //
      // learn this...
      //
      if (xs.current == null) {
        xs.current = tf.keep(startingModelPrediction);
        xy.current = tf.keep(y);
      } else {
        const previousX = xs.current;
        xs.current = tf.keep(previousX.concat(startingModelPrediction, 0));

        const previousY = xy.current;
        xy.current = tf.keep(previousY.concat(y, 0));

        previousX.dispose();
        previousY.dispose();
        y.dispose();
        webcamImg.dispose();
      }

      if (mouseDownVal === 'center') {
        setCenterImages((v) => v + 1);
      }
      if (mouseDownVal === 'left') {
        setLeftImages((v) => v + 1);
      }
      if (mouseDownVal === 'right') {
        setRightImages((v) => v + 1);
      }
    },
    [startingModel, tfWebcam]
  );

  const loopAndDetectPosition = useCallback(
    async function runDetection() {
      await delay();
      const webcamImg = await tfWebcam.capture();
      const processedImg = tf.tidy(() =>
        webcamImg.expandDims(0).toFloat().div(127).sub(1)
      );

      /*
        - the "startingModel.predict" returns an "embedding" layer
        - the output of that gets passed to the new model to be predicted
      */
      const initModelPrediction = startingModel.predict(processedImg);
      const newModelPrediction = myTrainedModel.predict(initModelPrediction);

      const predictedClass = newModelPrediction.as1D().argMax();
      const classId = (await predictedClass.data())[0];
      const predictedLabel = imagesByIndex[classId];

      webcamImg.dispose();
      processedImg.dispose();
      await tf.nextFrame();
      setPredictedHeadPosition(predictedLabel);
      setPredictionCount((v) => v + 1);
    },
    [myTrainedModel, startingModel, tfWebcam]
  );

  //
  // RUN the looping image-capture fn
  //
  useEffect(() => {
    if (mousedown !== false) {
      loopAndRecordImages(mousedown);
    }
  }, [mousedown, centerImages, leftImages, rightImages, loopAndRecordImages]);

  //
  // detect head position LOOP
  //
  useEffect(() => {
    if (runDetections) {
      loopAndDetectPosition();
    }
  }, [
    loopAndDetectPosition,
    myTrainedModel,
    runDetections,
    tfWebcam,
    predictionCount,
  ]);

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

  async function trainModel() {
    const layers = buildModelLayers(startingModel);

    // assemble model
    let newModel = tf.sequential({
      layers,
    });

    const optimizer = tf.train.adam(learningRate);
    newModel.compile({ optimizer: optimizer, loss: 'categoricalCrossentropy' });

    const batchSize = Math.floor(xs.current.shape[0] * batchSizeFraction);

    await newModel.fit(xs.current, xy.current, {
      batchSize,
      epochs,
      callbacks: {
        onBatchEnd: async (batch, logs) => {
          console.log('batch training loss: ' + logs.loss.toFixed(5));
        },
      },
    });

    setMyTrainedModel(newModel);
    setTraining(false);
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
        <MemoCheckbox onCheck={onCheck} enableChecked={enableChecked} />

        <div className="basis-full"></div>

        <ButtonBox
          headDirection={'Centered'}
          count={centerImages}
          enabled={Boolean(startingModel).toString()}
          onMouseDown={() => {
            setMousedown('center');
          }}
          onMouseUp={() => {
            setMousedown(false);
          }}
        />
        <ButtonBox
          headDirection={'Left'}
          count={leftImages}
          enabled={Boolean(startingModel).toString()}
          onMouseDown={() => {
            setMousedown('left');
          }}
          onMouseUp={() => {
            setMousedown(false);
          }}
        />
        <ButtonBox
          headDirection={'Right'}
          count={rightImages}
          enabled={Boolean(startingModel).toString()}
          onMouseDown={() => {
            setMousedown('right');
          }}
          onMouseUp={() => {
            setMousedown(false);
          }}
        />
      </section>

      <section id="video-button-layout" className="flex w-full">
        <video
          autoPlay
          className="flex-none"
          playsInline
          muted
          id="webcam"
          width="224"
          height="224"
          ref={webcamRef}
        ></video>
        <section
          id="train-and-detect-layout"
          className="flex flex-col grow w-full gap-8"
        >
          <button
            className="mx-2 rounded px-5 py-3 min-w-max overflow-hidden shadow relative bg-indigo-500 text-white dark:text-black hover:bg-opacity-90 active:bg-amber-200 transition-colors disabled:bg-indigo-800"
            disabled={Boolean(
              centerImages < 1 && leftImages < 1 && rightImages < 1
            )}
            onClick={() => {
              trainModel();
              setTraining(true);
            }}
          >
            Train Model
          </button>
          {training && <Loader />}
          {myTrainedModel && (
            <>
              <button
                className="mx-2 rounded px-5 py-3 min-w-max overflow-hidden shadow relative bg-indigo-500 text-white dark:text-black hover:bg-opacity-90 active:bg-amber-200 transition-colors disabled:bg-indigo-800"
                onClick={() => {
                  setRunDetections(true);
                }}
              >
                Start Detecting Head Position LIVE!
              </button>
              {detectedPosition && (
                <p>
                  Detected Head Position: <b>{detectedPosition}</b>
                </p>
              )}
            </>
          )}
        </section>
      </section>
      <footer className="flex flex-wrap w-full absolute bottom-0">
        {<TagList tags={tags} hideTitle />}
      </footer>
    </Layout>
  );
}
