import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgBack = (props: SvgProps) => (
  <Svg
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.723.314a1.01 1.01 0 0 1-.037 1.427L6.473 10.5l9.213 8.76a1.01 1.01 0 0 1-1.389 1.462l-9.983-9.49a1.01 1.01 0 0 1 0-1.464l9.983-9.49a1.008 1.008 0 0 1 1.426.036Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgBack;
