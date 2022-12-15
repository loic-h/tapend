import { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ViewStyle, Dimensions } from 'react-native';
import Thumb from '../components/Thumb';
import tokens from '../tokens/index.json';

type Props = {
  items: { thumbUri: string }[];
  activeIndex: number;
  style?: ViewStyle | ViewStyle[];
}

export default ({ items, activeIndex, style = {} }: Props) => {
  const listRef = useRef<FlatList>(null);
  const [layoutWidth, setLayoutWidth] = useState(0);
  const thumbSize = 60;

  useEffect(() => {
    listRef.current?.scrollToIndex({ animated: true, index: activeIndex, viewPosition: 0.5 })
  }, [activeIndex]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        contentContainerStyle={{
          ...styles.list,
          ...style,
          paddingHorizontal: (layoutWidth - thumbSize) / 2,
        }}
        data={items}
        renderItem={({ item, index }) => (
          <Thumb
            key={index}
            style={{
              ...styles.thumb,
              ...(index === 0 ? styles.thumbFirst : {}),
            }}
            size={thumbSize}
            uri={item.thumbUri}
            active={index === activeIndex} />
        )}
        snapToAlignment={'center'}
        initialScrollIndex={activeIndex}
        horizontal={true}
        centerContent={true}
        onScrollToIndexFailed={() => {}}
        onLayout={(e) => setLayoutWidth(e.nativeEvent.layout.width)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  list: {},
  thumb: {
    marginLeft: tokens.space.tiny,
  },
  thumbFirst: {
    marginLeft: 0,
  },
});