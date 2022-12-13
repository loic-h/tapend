import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgReset = (props: SvgProps) => (
  <Svg
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.808 8.222a1 1 0 1 0 1.414-1.414l-1.795-1.795A7 7 0 1 1 3 12a1 1 0 1 0-2 0 9 9 0 1 0 9.886-8.957l1.336-1.336A1 1 0 0 0 10.808.293L7.55 3.55a1 1 0 0 0 0 1.414l3.258 3.258Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgReset;
