import type { Image } from '@browse/product/product.type'

export type ImageOverlayPropTypes = {
  open: boolean
  setOpen: (isShow: boolean) => void
  imagesData: Image[]
  current: number
  setCurrent: (current: number) => void
}
