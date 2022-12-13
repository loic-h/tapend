import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgPlay = (props: SvgProps) => (
  <Svg
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M1 18.765V2.001a1 1 0 0 1 1.447-.894l16.764 8.382a1 1 0 0 1 0 1.789L2.447 19.66A1 1 0 0 1 1 18.765Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgPlay;
