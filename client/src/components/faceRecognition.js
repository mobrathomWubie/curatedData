import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

function FaceRecognition() {
  const videoRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoRef.current.srcObject = stream;
      });
    };

    loadModels();
  }, []);

  return <video ref={videoRef} autoPlay />;
}

export default FaceRecognition;
