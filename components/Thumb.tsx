import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import tokens from '../tokens/index.json';

type Props = {
  uri: string,
  imageOpacity?: number,
  style?: ViewStyle,
  borderRadius?: number,
};

export default ({ uri, imageOpacity = 1, style: propStyle = {}, borderRadius = 4 }: React.PropsWithChildren<Props>) => {
  return (
    <View style={{
      ...styles.container,
      ...propStyle
    }}>
      <Image style={{
        ...styles.image,
        opacity: imageOpacity,
        borderRadius
      }} source={{ uri }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: tokens.color.black,
  },
  image: {
    width: '100%',
    height: '100%',
  }
});