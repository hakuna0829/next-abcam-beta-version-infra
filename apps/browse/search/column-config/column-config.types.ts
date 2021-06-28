import { Filter } from '@browse/search/search.type'

type View = 'quickview' | 'publications' | 'none'

type SelectProductInterface = {
  (productCode: string, filters: Filter[]): void
}

type SetCurrentViewInterface = {
  (currentView: View): void
}

type ImagesInfoProps = {
  imageCount: number
  productCode: string
  selectProduct: SelectProductInterface
  filters: Filter[]
  setCurrentView: SetCurrentViewInterface
}

type PublicationsInfoProps = {
  publicationCount: number
  productCode: string
  selectProduct: SelectProductInterface
  setCurrentView: SetCurrentViewInterface
}

type Images = {
  src: string
}

type ProductTag = {
  label: string
  tagCode: string
}

type Conjugation = {
  label: string
}

type RowProps = {
  productCode: string
  keyword: string[]
  images: Images[]
  applications: string[]
  reactiveTaxa: string[]
  productName: string
  conjugation: Conjugation
  referenceCount: number
  productTags: ProductTag[]
  imageCount: number
  publicationCount: number
}

export type {
  SelectProductInterface,
  ImagesInfoProps,
  PublicationsInfoProps,
  SetCurrentViewInterface,
  RowProps,
}
