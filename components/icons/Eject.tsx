import * as React from 'react';
import Svg, {SvgProps, Rect, Path} from 'react-native-svg';
const SvgEject = (props: SvgProps) => (
  <Svg
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect
      x={1}
      y={16}
      width={19}
      height={4}
      rx={1}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={2}
    />
    <Path
      d="M18.904 12H2.096c-1.027 0-1.373-1.069-.83-1.65l8.404-9a1.157 1.157 0 0 1 1.66 0l8.403 9c.543.581.198 1.65-.83 1.65Z"
      stroke="currentColor"
      strokeWidth={2}
    />
  </Svg>
);
export default SvgEject;
