import { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Camera from '../components/Camera';
import BackIcon from '../components/icons/Back';
import NavigationBar from '../components/NavigationBar';
import RecordButton from '../components/RecordButton';
import Thumb from '../components/Thumb';
import globalStyles from '../styles';
import tokens from '../tokens/index.json';
import { getActiveTape, setActive } from '../store';
import type { RootStackParamList, Record } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootState } from '../store';

export default ({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'Record'>) => {
  const tape = useSelector((state: RootState) => getActiveTape(state.tapes));
  const [record, setRecord] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params.tapeId) {
      console.log(`Mounting Record screen for routed Tape ${route.params.tapeId}`);
      dispatch(setActive(route.params.tapeId));
    } else if (tape) {
      console.log(`Mounting Record screen for active Tape ${tape.id}`);
    } else {
      console.log(`Mounting Record screen for new Tape`);
    }
  }, []);

  const thumbsLength = 5;

  const thumbs: string[] = tape && tape.records
    ? tape.records.map((item: Record) => item.thumbUri).slice(-thumbsLength).reverse()
    : [] ;

  return (
    <View style={styles.container}>
      <NavigationBar>
        <Pressable onPress={ () => navigation.goBack() }>
          <BackIcon color={tokens.color.white} width="21" height="21" />
        </Pressable>
      </NavigationBar>
      <Camera record={record} />
      <View style={styles.controls}>
        <View style={styles.thumbsWrapper}>
          <View style={styles.thumbsContainer}>
            {thumbs.map((uri: string, index: number) => {
              return (
                <Thumb
                  key={index}
                  style={{
                    ...styles.thumb,
                    right: index * 15,
                    zIndex: (thumbsLength) - index
                  }}
                  uri={uri}
                  imageOpacity={1 * (1 - (2 * index) / ( 2 + (2 * index)))} />
              )})
            }
          </View>
        </View>
        <RecordButton on={() => setRecord(true)} off={() => setRecord(false)} />
        <View style={styles.controlRight} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.view.default,
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexGrow: 1,
  },
  recordButton: {
    flexShrink: 0,
  },
  thumbsWrapper: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbsContainer: {
    display: 'flex',
    width: 60,
    height: 60,
    position: 'relative',
  },
  thumb: {
    display: 'flex',
    width: 60,
    height: 60,
    backgroundColor: tokens.color.black,
    position: 'absolute',
  },
  controlRight: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '50%',
  }
});