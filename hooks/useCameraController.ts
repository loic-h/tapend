import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Camera } from 'react-native-vision-camera';
import { useDispatch } from 'react-redux';
import { store, addRecord } from '../store';
import type { Record } from '../types';

type CameraController = {
  start: (ref: React.RefObject<Camera>) => void;
  stop: (ref: React.RefObject<Camera>) => void;
  requestPermissions: () => Promise<boolean>;
  hasPermissions: () => Promise<boolean>;
};

const useCameraController = (): CameraController => {
  let camera = useRef<Camera>(null);
  const [el, setEl] = useState<Camera | null>(null);

  const start = async (ref: React.RefObject<Camera>):Promise<void> => {
    if(!ref) {
      return;
    }

    ref.current?.startRecording({
      onRecordingFinished: (video) => afterRecord(video.path),
      onRecordingError: (error) => {
        throw new Error(`${error}`)
      },
    });
  };

  const stop = async (ref: React.RefObject<Camera>): Promise<void> => {
    ref.current?.stopRecording();
  };

  const afterRecord = async (videoUri: string): Promise<void> => {
    // const { uri: thumbUri } = await VideoThumbnails.getThumbnailAsync(videoUri);
    // await storeRecord({
    //   videoUri,
    //   thumbUri,
    // });
  };

  const storeRecord = async (record:Record): Promise<void> => {
    const dispatch = useDispatch();
    dispatch(addRecord(record));
  };

  const setRef = (ref: React.RefObject<Camera>) => {
    camera = ref;
  }

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