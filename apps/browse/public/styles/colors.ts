/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// colors
// TODO: how to deal with dark mode?

export const primaryColor = '#0047bb'
export const primaryBackgroundColor = primaryColor
export const primaryBorder = `solid 2px ${primaryBackgroundColor};`
export const primaryInvisibleBorder = `solid 2px transparent;`

export const secondaryBackgroundColor = '#405959'

export const tertiaryBackgroundColor = '#fff'
export const tertiaryBorder = 'solid 1px rgba(39, 63, 63, 0.2)'

export const primaryFontColor = '#fff'

// Tints & Shades
export const grey98 = '#fafafa'
export const grey95 = '#f1f3f3'
export const grey90 = '#e4e7e7'
export const grey80 = '#c9cfcf'
export const grey70 = '#aeb7b7'
export const grey60 = '#919d9d'
export const grey50 = '#778888'
export const grey35 = '#405959'
export const grey20 = '#273f3f'
export const grey10 = '#0a2727'

export const blue98 = '#f8f9fc'
export const blue95 = '#edf1f7'
export const blue90 = '#dae2ef'
export const blue80 = '#b3c6e5'
export const blue60 = '#0047bb'
export const blue65 = '#759ad7'
export const blue55 = '#497dd2'
export const blue45 = '#1c5fcc'
export const blue35 = '#0044b2'
export const blue20 = '#002766'
export const blue10 = '#001333'

export const green98 = '#f6fefb'
export const green95 = '#e8fcf4'
export const green90 = '#d5f6e8'
export const green80 = '#a8f0d2'
export const green65 = '#6ce0b0'
export const green55 = '#3cdd9a'
export const green43 = '#17c67e'
export const green35 = '#13a066'
export const green20 = '#0b5b3a'
export const green10 = '#052e1d'

export const white = '#FFF'

// Transparencies
export const greyTransparent = (
  transparency: 5 | 10 | 11 | 12 | 13 | 20 | 40 | 60 | 80
) => `rgba(39, 63, 63, ${transparency / 100})`

export const blueTransparent = (transparency: 5 | 10 | 20 | 40 | 60 | 80) =>
  `rgba(28, 95, 204, ${transparency / 100})`

export const blueTransparentHover = (
  transparency: 5 | 10 | 20 | 40 | 60 | 80
) => `rgba(0, 71, 187, ${transparency / 100})`

export const greenTransparent = (transparency: 5 | 10 | 20 | 40 | 60 | 80) =>
  `rgba(23, 198, 126, ${transparency / 100})`

export const whiteTransparent = (
  transparency: 5 | 10 | 20 | 40 | 60 | 80 | 90
) => `rgba(255, 255, 255, ${transparency / 100})`

// Aliases: Brand colors
export const brandGrey = grey60
export const brandBlue = blue60

// Aliases: Background colors
export const darkGreyBackground = grey20
export const lightGreyBackground = grey95
export const blueBackground = blue35
export const whiteBackground = white
export const lightbox = greyTransparent(20)

// Aliases: Text colors
export const gloabalText = grey20
export const linkText = blue20
export const globalTextWhite = white
export const globalTextLight = grey95

// Aliases: Interaction colors
export const defaultBlue = blue45
export const defaultGreen = green43
export const defaultGrey = grey95
export const defaultDarkGrey = grey35
export const hoverBlueTransparent = blueTransparent(5)
export const hoverGreenTransparent = greenTransparent(5)
export const hoverGreyTransparent = greyTransparent(5)
export const hoverWhiteTransparent = whiteTransparent(5)

export const hoverBlue = blue45
export const hoverGreen = green43
export const hoverGrey = grey95
export const hoverDarkGrey = grey35

export const activeBlueTransparent = blueTransparent(10)
export const activeGreenTransparent = greenTransparent(10)
export const activeGreyTransparent = greyTransparent(10)
export const activeWhiteTransparent = whiteTransparent(10)

export const activeBlue = blue45
export const activeGreen = green43
export const activeGrey = grey95
export const activeDarkGrey = grey35
