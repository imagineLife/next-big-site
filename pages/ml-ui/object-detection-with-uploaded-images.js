import '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
// components
import Layout from './../../components/Layout';
import SEO from './../../components/SEO';

const IMAGE_SIZE = 224;

function ImageDropzone({ predictFn }) {
  function onFileChange(e) {
    const { files } = e.target;
    const uploadedFile = files[0];
    if (!uploadedFile.type.match('image.*')) {
      console.error('use an image file');
      return;
    }

    let reader = new FileReader();
    reader.onload = (e) => {
      let img = document.createElement('img');
      img.src = e.target.result;
      img.width = IMAGE_SIZE;
      img.height = IMAGE_SIZE;
      img.onload = () => {
        predictFn(img);
      };
    };
    reader.readAsDataURL(uploadedFile);
  }
  return (
    <div
      className="relative border-2 border-gray-300 border-dashed rounded-lg p-6"
      id="dropzone"
    >
      <input
        type="file"
        id="file"
        className="absolute inset-0 w-full h-full opacity-0 z-50"
        onChange={onFileChange}
      />
      <div className="text-center">
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          <label htmlFor="file-upload" className="relative cursor-pointer">
            <span>Drag and drop</span>
            <span className="text-indigo-600 cursor-pointer"> or browse</span>
            <span>to upload</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
            />
          </label>
        </h3>
        <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
      </div>

      {/* <Image
        src=""
        className="mt-4 mx-auto max-h-40 hidden"
        id="preview"
        layout="fill"
        alt="preview"
      /> */}
    </div>
  );
}

async function loadCoco() {
  let res = await cocoSsd.load();
  return res;
}

export default function ObjectDetectionPage() {
  const [uploadedImg, setUploadedImg] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    loadCoco().then(setModel);
  }, []);

  const predictFn = useCallback(
    async function innerPredict(image) {
      const predictionFromModel = await model.detect(image);
      console.log('predictionFromModel');
      console.log(predictionFromModel);
    },
    [model]
  );
  return (
    <Layout>
      <SEO
        title={'Detecting Objects in Uploaded Images'}
        excerpt={
          'Using Machine Learning with tensorflow js and the coco-ssd model to detect objects in images uploaded to the web'
        }
        slug={`/ml-ui/object-detection-with-uploaded-images`}
        tags={[
          'js',
          'javascript',
          'tensorflow',
          'tensorflowjs',
          'machine learning',
          'coco-ssd',
          'react',
          'nextjs',
        ]}
      />
      <h1>Object Detection In An Uploaded Image</h1>
      {!model && <span>Loading machine-learning model...</span>}
      {model && (
        <>
          <p>
            Upload an image to see the coco-ssd model detech one of 80
            pre-trained objects in the image!
          </p>
          <section id="input">
            <div id="file-container">
              {/* "vanilla" file input includes the button and "no file chosen" text! */}
              {/* <input type="file" id="file" name="file" className="cursor-pointer" /> */}

              <ImageDropzone predictFn={predictFn} />
            </div>

            <div id="loaded-image"></div>
          </section>

          <section id="predictions">
            <div className="output"></div>
            <div id="predictions"></div>
          </section>
        </>
      )}
    </Layout>
  );
}
