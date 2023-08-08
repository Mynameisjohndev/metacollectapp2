import { Defs, Mask, Rect, Svg } from 'react-native-svg';

import { CustomReadQrcodeFormat } from './styles';

const Scanner = () => {
  return (
    <CustomReadQrcodeFormat>
      <Svg>
        <Defs>
          <Mask id="mask" x="0" y="0" height="100%" width="100%">
            <Rect height="100%" width="100%" fill="#fff" />
            <Rect
              x="50%"
              y="50%"
              width="250"
              height="250"
              fill="black"
              rx="10"
              transform="translate(-125, -125)"
            />
          </Mask>
        </Defs>
        <Rect
          height="100%"
          width="100%"
          fill="rgba(0, 0, 0, 0.7)"
          mask="url(#mask)"
        />
        <Rect
          x="50%"
          y="50%"
          width="250"
          height="250"
          strokeWidth="6"
          stroke="#fff"
          rx="10"
          fill="transparent"
          transform="translate(-125, -125)"
        />
      </Svg>
    </CustomReadQrcodeFormat>
  );
};

export { Scanner };
