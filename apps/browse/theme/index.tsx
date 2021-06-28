import { createGlobalStyle } from 'styled-components'

import { color } from './color'
import { elevation } from './elevation'
import * as size from './size'
import * as text from './text'

// import Eina01SemiboldPath from '@browse/assets/fonts/Eina01-Semibold.otf';
// import Eina03SemiboldPath from '@browse/assets/fonts/Eina03-Semibold.ttf';
// import Eina03SemiboldItalicPath from '@browse/assets/fonts/Eina03-SemiboldItalic.ttf';
// import LubalinGraphStdBookPath from '@browse/assets/fonts/LubalinGraphStd-Book.otf';
// import LubalinGraphStdDemiPath from '@browse/assets/fonts/LubalinGraphStd-Demi.otf';

export const theme = {
  color,
  elevation,
  size,
  text,
}

export type Theme = typeof theme

export const Style = createGlobalStyle`

    html, body {
        font-family: 'Eina03-Semibold';
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }
`
