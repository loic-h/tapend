import { StyleSheet } from "react-native";
import { color, font, space } from '../tokens/index.json';

export default {
  font: StyleSheet.create({
    default: {
      fontFamily: font.family.inter,
      color: color.white,
      fontSize: font.size.default,
    },
    bold: {
      fontFamily: font.family.interBold,
      color: color.white,
      fontSize: font.size.default,
    },
    mono: {
      fontFamily: font.family.robotoMono,
      color: color.white,
      fontSize: font.size.default,
    }
  }),
  view: StyleSheet.create({
    default: {
      flexGrow: 1,
      backgroundColor: color.black,
      display: 'flex',
      padding: space.small,
    },
  }),
};