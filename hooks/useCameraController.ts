import React, { useRef } from 'react';
import { Camera } from 'react-native-vision-camera';
import { useDispatch } from 'react-redux';
import { addRecord } from '../store';
import { createThumbnail } from "react-native-create-thumbnail";
import type { Record } from '../types';

type CameraController = {
  start: (ref: React.RefObject<Camera>, onComplete: (record: Record) => void) => void;
  stop: (ref: React.RefObject<Camera>) => void;
  requestPermissions: () => Promise<boolean>;
  hasPermissions: () => Promise<boolean>;
};

const useCameraController = (): CameraController => {
  const start = async (ref: React.RefObject<Camera>, onComplete: (record: Record) => void):Promise<void> => {
    if(!ref) {
      return;
    }

    console.log('Start recording')
    ref.current?.startRecording({
      onRecordingFinished: (video) => afterRecord(video.path, onComplete),
      onRecordingError: (error) => {
        throw new Error(`${error.code}`)
      },
    });
  };

  const stop = async (ref: React.RefObject<Camera>): Promise<void> => {
    if(!ref) {
      return;
    }

    console.log('Stop recording')
    ref.current?.stopRecording();
  };

  const afterRecord = async (videoUri: string, onComplete: (record: Record) => void): Promise<void> => {
    try {
      console.log('Generate thumbnail for video:', videoUri);
      const { path: thumbUri } = await createThumbnail({
        url: videoUri,
        timeStamp: 1000,
      });
      console.log('Thumbnail done: ', videoUri);
      if (onComplete) {
        onComplete({
          videoUri,
          thumbUri,
        });
      }
    } catch(e) {
      console.log('Error while processing video:', e);
    }
  };

  const storeRecord = async (record:Record): Promise<void> => {

  };

  const requestPermissions = async (): Promise<boolean> => {
    const cameraPermission = await Camera.requestCameraPermission();
    const microphonePermission = await Camera.requestMicrophonePermission()
    return cameraPermission === 'authorized' && microphonePermission === 'authorized';
  };

  const hasPermissions = async (): Promise<boolean> => {
    const cameraPermission = await Camera.requestCameraPermission();
    const microphonePermission = await Camera.requestCameraPermission();
    return cameraPermission === 'authorized' && microphonePermission === 'authorized';
  }

  return {
    start,
    stop,
    requestPermissions,
    hasPermissions,
  }
};

export default useCameraController;