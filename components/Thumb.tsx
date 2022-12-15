import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import tokens from '../tokens/index.json';

type Props = {
  uri: string,
  imageOpacity?: number,
  style?: ViewStyle | ViewStyle[],
  borderRadius?: number,
  size?: number,
  active?: boolean,
};

export default ({
  uri,
  imageOpacity = 1,
  size = 60,
  borderRadius = 4,
  active = false,
  style: propStyle = {},
}: React.PropsWithChildren<Props>) => {
  return (
    <View style={{
      ...styles.container,
      width: size,
      height: size,
      borderRadius,
      ...propStyle,
    }}>
      <Image style={{
        ...styles.image,
        opacity: imageOpacity,
        borderRadius,
        ...(active ? styles.active : {}),
      }} source={{ uri }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: tokens.color.darkGrey,
  },
  active: {
    borderWidth: 2,
    borderColor: tokens.color.yellow,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: tokens.color.darkGrey,
  },
});