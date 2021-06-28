// Base size of the root element. Will be equivalent to 1rem, and all of the other values will be derived from it
const basePixelSize = 16

const pixelsToRem = (pixelNumber) => {
  return `${pixelNumber / basePixelSize}rem`
}

module.exports = { pixelsToRem }
