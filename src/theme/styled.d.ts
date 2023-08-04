/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prettier/prettier */
import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    COLORS: {
      WHITE: string;
      PRIMARY: string;
      SECONDARY: string;
      // PRIMARY: string,
      // SECONDARY: string,
      GREY: string;
      GREY10: string;
      GREY50: string;
      BLACK: string;
      INPUT: string;
      RED: string;
      YELLOW: string;
      ORANGE: string;
    };
  }
}