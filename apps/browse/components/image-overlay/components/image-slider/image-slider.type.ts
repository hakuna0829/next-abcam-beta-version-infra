import type { Image } from '@browse/product/product.type'

export type ImageSliderProps = {
  imagesDataOpt: Image[]
  setCurrent: (number: number) => void
  margin?: string
  hideStore?: boolean
  hideOverlay?: boolean
  current?: number
  imageWidth?: number
  imageHeight?: number
}

export type ImageWrapperProps = {
  width: number
  height: number
}

export type SliderImagesContainerProps = {
  imageWidth: number
  marginLeft: number
  current: number
}
