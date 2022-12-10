import { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Video from 'react-native-video';
import globalStyles from '../styles';
import BackIcon from '../components/icons/Back';
import NavigationBar from '../components/NavigationBar';
import tokens from '../tokens/index.json';
import useCurrentTape from '../hooks/useCurrentTape';
import type { RootStackParamList } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export default ({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Tape'>) => {
  const tape = useCurrentTape();
  const [currentRecord, setCurrentRecord] = useState(0);
  const videoUri = tape?.records[currentRecord].videoUri;

  const goBack = () => {
    navigation.navigate('Record', { tapeId: route.params.tapeId });
  };

  return (
    <View style={styles.container}>
      <NavigationBar>
        <Pressable onPress={ goBack }>
          <BackIcon color={tokens.color.white} width="21" height="21" />
        </Pressable>
        <Text style={styles.headline}>Tape {route.params.tapeId}</Text>
      </NavigationBar>
      <Video
        source={{ uri: videoUri }}
        style={styles.video}
        resizeMode={"cover"} />
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
    backgroundColor: 'green',
    borderRadius: tokens.radius.large,
    overflow: 'hidden',
    marginHorizontal: -15,
  }
});