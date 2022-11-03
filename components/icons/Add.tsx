import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgAdd = (props: SvgProps) => (
  <Svg
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.45 1a1 1 0 1 0-2 0v8.45H1a1 1 0 0 0 0 2h8.45V20a1 1 0 1 0 2 0v-8.55H20a1 1 0 1 0 0-2h-8.55V1Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgAdd;
