import type { Image } from '@browse/product/product.type'

export type ApplicationImagesProps = {
  imagesData: Image[]
  isOverlayOpen: boolean
  overlayClick: (open: boolean) => void
}
