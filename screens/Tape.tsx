import { useRef, useState } from 'react';
import { View, StyleSheet, Text, Pressable, FlatList } from 'react-native';
import Video, { OnProgressData } from 'react-native-video';
import globalStyles from '../styles';
import BackIcon from '../components/icons/Back';
import ResetIcon from '../components/icons/Reset';
import PlayIcon from '../components/icons/Play';
import PauseIcon from '../components/icons/Pause';
import AddIcon from '../components/icons/Add';
import IndicatorIcon from '../components/icons/Indicator';
import NavigationBar from '../components/NavigationBar';
import Timer from '../components/Timer';
import tokens from '../tokens/index.json';
import useCurrentTape from '../hooks/useCurrentTape';
import { log } from '../services/log';
import type { RootStackParamList } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ThumbsRail from '../components/ThumbsRail';

export default ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Tape'>) => {
  const tape = useCurrentTape();
  const [currentRecordIndex, setCurrentRecordIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videos = useRef<(Video | null)[]>([]);

  if (!tape) {
    return (
      <Text style={globalStyles.font.default}>No tape</Text>
    )
  }

  const records = tape.records;
  const currentRecord = records[currentRecordIndex];
  const totalTime = records.reduce((a, r) => a + r.duration, 0) || 0;

  const onResetPress = () => {
    seek(0);
  };

  const onPlayPress = () => {
    if (currentTime >= totalTime) {
      seek(0);
    }
    setPlaying(!playing);
  };

  const onAddPress = () => {
    navigation.navigate('Record', { tapeId: tape.id });
  };

  const goBack = () => {
    if (tape) {
      navigation.navigate('Record', { tapeId: tape.id });
    } else {
      navigation.navigate('Home');
    }
  };

  const onVideoProgress = (data: OnProgressData) => {
    setCurrentTime(records.slice(0, currentRecordIndex).reduce((acc, record) => {
      return record.duration + acc;
    }, 0) + data.currentTime);
  };

  const onVideoEnd = () => {
    log(`Record ended with index ${currentRecordIndex}`)
    if (currentRecordIndex >= records.length - 1) {
      setPlaying(false);
      setCurrentTime(totalTime);
      return;
    }
    setCurrentRecordIndex(currentRecordIndex + 1);
    setCurrentTime(records.slice(0, currentRecordIndex + 1).reduce((acc, record) => {
      return record.duration + acc;
    }, 0));
  };

  const seek = (time: number) => {
    let currentRecordIndex = 0;
    let t = 0;
    let currentRecordTime = 0;

    for(let i = 0; i < records.length; i++) {
      if (t < time) {
        t += currentRecord.duration;
        currentRecordIndex = i;
      } else if (currentRecordIndex === i) {
        currentRecordTime = time - t;
      } else {
        videos.current[i]?.seek(0)
      }
    }

    setCurrentRecordIndex(currentRecordIndex);
    setCurrentTime(time);
    videos.current[currentRecordIndex]?.seek(currentRecordTime)
  };

  return (
    <View style={styles.container}>
      <NavigationBar>
        <Pressable onPress={ goBack }>
          <BackIcon color={tokens.color.white} width="21" height="21" />
        </Pressable>
        <Text style={styles.headline}>Tape {tape.id}</Text>
      </NavigationBar>

      { records.map((record, index) => (
        <Video
          key={index}
          ref={el => videos.current[index] = el}
          source={{ uri: record.videoUri }}
          style={{
            ...styles.video,
            ...(currentRecordIndex === index ? styles.videoActive : {}),
          }}
          resizeMode={"cover"}
          paused={!(currentRecordIndex === index && playing)}
          onProgress={onVideoProgress}
          onEnd={onVideoEnd} />
      ))}

      <View style={styles.timerBar}>
        <Timer time={currentTime} />
        <Timer time={totalTime} />
      </View>

      <View style={styles.progressBar}>
        <IndicatorIcon
          color={tokens.color.yellow}
          width="12"
          height="12"
          style={{
            ...styles.indicator,
            left: `${currentTime * 100 / totalTime}%`
          }} />
        { records.map((record, index) => (
          <View key={index} style={{
            ...styles.progressChunk,
            ...(index === 0 ? styles.progressChunkFirst : {}),
            ...(index <= currentRecordIndex ? styles.progressChunkActive : {}),
            width: `${record.duration * 100 / totalTime}%`,
          }} />
        ))}
      </View>

      <View style={styles.thumbsRailContainer}>
        {records.length > 0 && (
          <ThumbsRail style={styles.thumbsRail} items={records} activeIndex={currentRecordIndex} />
        )}
      </View>

      <View style={styles.controls}>
        <Pressable onPress={onResetPress}>
          <ResetIcon color={tokens.color.white} width="30" height="30" />
        </Pressable>
        <Pressable onPress={onPlayPress}>
          {playing ? (
            <PauseIcon color={tokens.color.white} width="45" height="45" />
          ) : (
            <PlayIcon color={tokens.color.white} width="45" height="45" />
          )}
        </Pressable>
        <Pressable onPress={onAddPress}>
          <AddIcon color={tokens.color.white} width="30" height="30" />
        </Pressable>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.view.default,
  },
  headline: {
    ...globalStyles.font.bold
  },
  video: {
    aspectRatio: 1,
    marginHorizontal: -tokens.space.small,
    borderRadius: tokens.radius.large,
    overflow: 'hidden',
    backgroundColor: tokens.color.darkGrey,
    display: 'none',
  },
  videoActive: {
    display: 'flex',
  },
  timerBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: tokens.space.small,
  },
  progressBar: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: tokens.space.medium,
    paddingTop: tokens.space.small,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    marginLeft: -tokens.space.tiny,
  },
  progressChunk: {
    height: 2,
    backgroundColor: tokens.color.white,
    borderLeftWidth: 2,
    borderColor: tokens.color.black,
  },
  progressChunkFirst: {
    marginLeft: 0,
    borderLeftWidth: 0,
  },
  progressChunkActive: {
    backgroundColor: tokens.color.yellow,
  },
  thumbsRailContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: -tokens.space.small,
    marginTop: tokens.space.small,
  },
  thumbsRail: {},
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    marginTop: tokens.space.large
  }
});