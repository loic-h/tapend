import React from 'react';
import { Camera } from 'react-native-vision-camera';
import { createThumbnail } from "react-native-create-thumbnail";
import { DocumentDirectoryPath, moveFile } from 'react-native-fs';
import type { Record } from '../types';

type CameraController = {
  start: (ref: React.RefObject<Camera>, onComplete: (record: Record) => void) => void;
  stop: (ref: React.RefObject<Camera>) => void;
  requestPermissions: () => Promise<boolean>;
  hasPermissions: () => Promise<boolean>;
};

const useCameraController = (): CameraController => {
  const start = async (ref: React.RefObject<Camera>, onComplete: (record: Record) => void):Promise<void> => {
    console.log('start')
    if(!ref) {
      return;
    }

    return new Promise((resolve, reject) => {
      console.log('Start recording')
      ref.current?.startRecording({
        onRecordingFinished: async (video) => {
          console.log(video.duration)
          await afterRecord(video.path, video.duration, onComplete);
          resolve();
        },
        onRecordingError: (error) => {
          reject(`Error while recording: ${error.code}`)
        },
      });
    });
  };

  const stop = async (ref: React.RefObject<Camera>): Promise<void> => {
    if(!ref) {
      return;
    }

    console.log('Stop recording')
    ref.current?.stopRecording();
  };

  const afterRecord = async (videoUri: string, duration: number, onComplete: (record: Record) => void): Promise<void> => {
    console.log('afterRecord')
    try {
      const thumbUri = await doThumbnail(videoUri);
      console.log(`Generated thumbnail for video ${videoUri} at ${thumbUri}`);

      console.log('Move files to doc folder');
      const newVideoUri = await moveToDocuments(videoUri);
      const newThumbUri = await moveToDocuments(thumbUri);

      console.log('Thumbnail done: ', videoUri);
      if (onComplete) {
        onComplete({
          videoUri: newVideoUri,
          thumbUri: newThumbUri,
          duration,
        });
      }
    } catch(e) {
      console.log('Error while processing video:', e);
    }
  };

  const doThumbnail = async (videoUri: string): Promise<string> => {
    const thumb = createThumbnail({
      url: videoUri,
      timeStamp: 0,
    });
    return (await thumb).path;
  };

  const moveToDocuments = async (path: string) => {
    const destPath = `${DocumentDirectoryPath}/${getFilename(path)}`;
    console.log(`Moved movie file to ${destPath}`);
    await moveFile(path, destPath);
    return destPath;
  };

  const getFilename = (path: string): string => {
    return path.substring(path.lastIndexOf('/') + 1);;
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