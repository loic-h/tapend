import { View, StyleSheet, Pressable, Image } from "react-native";
import { Camera, CameraDevice, useCameraDevices } from 'react-native-vision-camera';
import globalStyles from '../styles';
import BackIcon from '../components/icons/Back';
import tokens from '../tokens/index.json';
import NavigationBar from '../components/NavigationBar';
import RecordButton from '../components/RecordButton';
import AddIcon from '../components/icons/Add';
import useCameraController from "../hooks/useCameraController";
import { useSelector } from "react-redux";
import { getActiveTape, RootState } from '../store';
import type { RootStackParamList, Record } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useEffect, useRef } from "react";

export default ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Record'>) => {
  // const camera = useCameraController();
  const camera = useRef<Camera>(null)
  const devices = useCameraDevices();
  const device = devices.back as CameraDevice;

  const tape = useSelector((state: RootState) => getActiveTape(state.tapes));

  const thumbs: string[] = tape && tape.records
    ? tape.records.map((item: Record) => item.thumbUri).slice(-3)
    : [] ;

    useEffect(() => {
    console.log(tape)
  })


  const start = () => {
    camera.current?.startRecording({
      flash: 'on',
      onRecordingFinished: (video) => console.log(video),
      onRecordingError: (error) => console.error(error),
    })
  }

  const stop = async ():Promise<void> => {
    camera.current?.stopRecording();
  };

  const Mark = () => <AddIcon
    color={ tokens.color.white }
    width="12" height="12" />

  return (
    <View style={styles.container}>
      <NavigationBar>
        <Pressable onPress={ () => navigation.goBack() }>
          <BackIcon color={tokens.color.white} width="21" height="21" />
        </Pressable>
      </NavigationBar>
      <View style={ styles.cameraWrapper }>
        { camera && (
          <Camera
            style={styles.camera}
            ref={camera}
            device={device}
            isActive={true}
            video={true}>
            <View style={styles.markLine}>
              <Mark />
              <Mark />
            </View>
            <View style={styles.markLine}>
              <Mark />
              <Mark />
            </View>
          </Camera>
        )}
      </View>
      <View style={styles.controls}>
        <View style={styles.thumbWrapper}>
          <View style={styles.thumbContainer}>
            {thumbs.map((uri: string, index: Number) => {
              return <Image style={styles.thumb} source={{ uri }} key={`${index}`} />
            })}
          </View>
        </View>
        <RecordButton on={start} off={stop} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.view.default,
  },
  cameraWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    marginLeft: -15,
    marginRight: -15,
    position: 'relative',
  },
  camera: {
    display: 'flex',
    backgroundColor: 'red',
    aspectRatio: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  markLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexGrow: 1,
  },
  recordButton: {

  },
  thumbWrapper: {
    flexGrow: 1,
    flexShrink: 0,
  },
  thumbContainer: {
    display: 'flex',
    width: 60,
    height: 60,
    position: 'absolute',
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: 'red',
    objectFit: 'cover',
  },
});