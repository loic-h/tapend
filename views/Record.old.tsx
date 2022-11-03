import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { View, TouchableHighlight, StyleSheet, Text, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as VideoThumbnails from 'expo-video-thumbnails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Tape, Record, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Record'>

export default ({ route, navigation }: Props) => {
  const [tape, setTape] = useState<Tape | null>(null);

  let camera: Camera | null = new Camera({});

  const createId = ():string => {
    return '456';
  };

  const getTape = async (tapeId:string): Promise<Tape | null> => {
    try {
      const item = await AsyncStorage.getItem(`@tape:${tapeId}`);
      if (item !== null) {
        return JSON.parse(item);
      }
      return {
        id: tapeId,
        records: [],
      };
    } catch (e) {
      return null;
    }
  };

  const startRecording = async ():Promise<void> => {
    if(camera) {
      console.log('startRecording')
      const data = await camera.recordAsync();
      await afterRecord(data.uri);
    }
  };

  const stopRecording = async ():Promise<void> => {
    camera?.stopRecording();
  };

  const afterRecord = async (videoUri: string): Promise<void> => {
    console.log('afterRecord')
    const { uri: thumbUri } = await VideoThumbnails.getThumbnailAsync(videoUri);
    await storeRecord({
      videoUri,
      thumbUri,
    });
  };

  const storeRecord = async (record:Record):Promise<void> => {
    if (!tape) {
      return;
    }
    const records = tape.records;
    records.push(record);
    await AsyncStorage.setItem(`@tape:${tapeId}`, JSON.stringify({ ...tape, records }));
    const res = await AsyncStorage.getItem(`@tape:${tapeId}`);
  };

  const clearStorage = async () => {
    AsyncStorage.clear();
  };

  const tapeId: string = route.params.tapeId || createId();
  const thumbs: string[] = tape && tape.records
    ? tape.records.map((item: Record) => item.thumbUri).slice(-3)
    : [] ;

  useEffect(() => {
    const initTape = async () => {
      const item = await getTape(tapeId);
      setTape(item);
      await AsyncStorage.clear();
    }
    if (!tape) {
      initTape();
    }
    console.log(thumbs);
  }, []);

  if (!tapeId) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={ref => camera = ref}>
        <View style={styles.cameraPlaceholder} />
        <View style={styles.buttonContainer}>
          <View style={styles.thumbWrapper}>
            <View style={styles.thumbContainer}>
              {thumbs.map((uri: string, index: Number) => {
                return <Image style={styles.thumb} source={{ uri }} key={`${index}`} />
              })}
            </View>
          </View>

          <TouchableHighlight style={styles.button} onPressIn={startRecording} onPressOut={stopRecording}>
            <Fragment />
          </TouchableHighlight>

          <View style={styles.buttonContainerPlaceholder}></View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
  camera: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
  cameraPlaceholder: {
    flexGrow: 1,
  },
  buttonContainer: {
    display: 'flex',
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 32,
  },
  buttonContainerPlaceholder: {
    flexGrow: 1,
    flexShrink: 0,
    backgroundColor: 'green',
  },
  button: {
    flexGrow: 0,
    flexShrink: 1,
    width: 60,
    aspectRatio: 1,
    backgroundColor: 'red',
    borderRadius: 100,
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
