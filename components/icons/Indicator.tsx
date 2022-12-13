import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgIndicator = (props: SvgProps) => (
  <Svg
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M17.892 0H3.108C.8 0-.7 2.429.332 4.493l7.392 14.79c1.144 2.29 4.408 2.29 5.552 0l7.392-14.79C21.7 2.43 20.2 0 17.892 0Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgIndicator;
