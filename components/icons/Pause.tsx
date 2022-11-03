import * as React from "react";
import Svg, { SvgProps, Rect } from "react-native-svg";
const SvgPause = (props: SvgProps) => (
  <Svg
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x={2} width={6} height={21} rx={2} fill="currentColor" />
    <Rect x={13} width={6} height={21} rx={2} fill="currentColor" />
  </Svg>
);
export default SvgPause;
