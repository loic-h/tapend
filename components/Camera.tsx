import React, { useEffect, useRef, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, Text } from 'react-native';
import { Camera, CameraDevice, useCameraDevices } from 'react-native-vision-camera';
import useCameraController from '../hooks/useCameraController';
import { useDispatch } from 'react-redux';
import AddIcon from '../components/icons/Add';
import { addRecord } from '../store';
import tokens from '../tokens/index.json';

type Props = {
  style?: StyleProp<ViewStyle>,
  record: boolean
};

export default ({ style, record = false }: Props) => {
  let cameraRef = useRef<Camera>(null);
  const camera = useCameraController();
  const devices = useCameraDevices();
  const device = devices.back as CameraDevice;
  const [isRecording, setIsRecording] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (record) {
      start();
    } else if (isRecording) {
      stop();
    }
  }, [record]);

  const start = () => {
    setIsRecording(true);
    camera.start(cameraRef, (record) => {
      console.log('Saving record', record)
      dispatch(addRecord(record));
    });
  }

  const stop = () => {
    camera.stop(cameraRef);
    setIsRecording(false);
  }

  const Mark = () => (
    <AddIcon
      color={ tokens.color.white }
      width="12" height="12" />
  );

  if (!camera || !device) {
    return (
      <View style={[style, styles.cameraWrapper]}>
        <View style={styles.placeholder}>
        </View>
      </View>
    )
  }

  return (
    <View style={[style, styles.cameraWrapper]}>
      <Camera
        ref={cameraRef}
        device={device}
        isActive={true}
        video={true}
        audio={true}>
        <View style={styles.cameraContainer}>
          <View style={styles.markLine}>
            <Mark />
            <Mark />
          </View>
          <View style={styles.markLine}>
            <Mark />
            <Mark />
          </View>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: -15,
    aspectRatio: 1,
    backgroundColor: 'green'
  },
  cameraContainer: {
    aspectRatio: 1,
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  markLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  placeholder: {
    backgroundColor: 'blue',
    flex: 1
  }
})