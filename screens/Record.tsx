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
import { setActive } from '../store';
import useCurrentTape from '../hooks/useCurrentTape';
import { log } from '../services/log';
import type { RootStackParamList, Record } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export default ({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'Record'>) => {
  const tape = useCurrentTape();
  const [record, setRecord] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params && route.params.tapeId) {
      log(`Mounting Record screen for routed Tape ${route.params.tapeId}`);
      dispatch(setActive(route.params.tapeId));
    } else if (tape) {
      log(`Mounting Record screen for active Tape ${tape.id}`);
    } else {
      log(`Mounting Record screen for new Tape`);
    }
  }, []);

  const thumbsLength = 5;

  const thumbs: string[] = tape && tape.records
    ? tape.records.map((item: Record) => item.thumbUri).slice(-thumbsLength).reverse()
    : [] ;

  const goToTape = () => {
    navigation.navigate('Tape', { tapeId: tape?.id });
  };

  return (
    <View style={styles.container}>
      <NavigationBar>
        <Pressable onPress={ () => navigation.navigate('Home') }>
          <BackIcon color={tokens.color.white} width="21" height="21" />
        </Pressable>
      </NavigationBar>
      <Camera record={record} />
      <View style={styles.controls}>
        <View style={styles.thumbsWrapper}>
          <Pressable
            style={styles.thumbsContainer}
            onPress={goToTape}>
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
          </Pressable>
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
    backgroundColor: tokens.color.black,
    position: 'absolute',
  },
  controlRight: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '50%',
  }
});