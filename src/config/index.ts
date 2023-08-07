import { PixelRatio } from 'react-native';

import { passwordGenerator } from '../utils/passwordGenerator';

const BUTTON_BORDER_RADIUS = 10;
const INPUT_BORDER_RADIUS = 10;
const CONTENT_BORDER_RADIUS = 10;
const CARD_BORDER_RADIUS = 10;
const APP_FONT_REGULAR = 'Montserrat-Regular';
const APP_FONT_SEMI_BOLD = 'Montserrat-SemiBold';
const APP_FONT_BOLD = 'Montserrat-Bold';

const META_COLLECT_PASSWORD_CONFIG = passwordGenerator();

const returnAdjustedFont = (size: number) => {
  return `${PixelRatio.getFontScale() * size}px`;
};

export {
  BUTTON_BORDER_RADIUS,
  INPUT_BORDER_RADIUS,
  CONTENT_BORDER_RADIUS,
  CARD_BORDER_RADIUS,
  APP_FONT_REGULAR,
  APP_FONT_SEMI_BOLD,
  APP_FONT_BOLD,
  META_COLLECT_PASSWORD_CONFIG,
  returnAdjustedFont,
};
