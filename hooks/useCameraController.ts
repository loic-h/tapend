import React, { useRef } from 'react';
import { Camera } from 'react-native-vision-camera';
import { useDispatch } from 'react-redux';
import { store, addRecord } from '../store';
import type { Record } from '../types';

type CameraController = {
  el: React.RefObject<Camera>;
  start: () => Promise<void>;
  stop: () => Promise<void>;
};

const useCameraController = (): CameraController => {
  let camera = useRef<Camera>(null);
  const dispatch = useDispatch();

  const start = async ():Promise<void> => {
    if(camera) {
      const data = camera.current?.startRecording({
        onRecordingFinished: (video) => console.log(video),
        onRecordingError: (error) => console.error(error),
      });
      // if (!data) {
      //   throw Error('No data found on camera record.')
      // }
      // await afterRecord(data.uri);
    }
  };

  const afterRecord = async (videoUri: string): Promise<void> => {
    // const { uri: thumbUri } = await VideoThumbnails.getThumbnailAsync(videoUri);
    // await storeRecord({
    //   videoUri,
    //   thumbUri,
    // });
  };

  const storeRecord = async (record:Record):Promise<void> => {
    dispatch(addRecord(record));
  };

  const stop = async ():Promise<void> => {
    camera.current?.stopRecording();
  };

  return {
    el: camera,
    start,
    stop
  }
};

export default useCameraController;