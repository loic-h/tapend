import { StyleSheet } from "react-native";
import { color, font } from '../tokens/index.json';

export default {
  font: StyleSheet.create({
    default: {
      fontFamily: 'Inter-Regular',
      color: color.white,
      fontSize: font.size.default,
    }
  }),
  view: StyleSheet.create({
    default: {
      flexGrow: 1,
      backgroundColor: color.black,
      display: 'flex',
    }
  }),
};