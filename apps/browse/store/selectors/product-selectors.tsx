import { State } from '../index'
import {
  KeyFacts,
  Publication,
  ReactivityApplication,
  ValidationDetail,
} from '@browse/product/product.type'
import { ProductState } from '../reducers/product-reducer'
import { createSelector } from '@reduxjs/toolkit'

const getProductState = (state: State) => state.productReducer

const getProduct = createSelector(
  getProductState,
  (state: ProductState) => state.product
)

const getReactivityApplications = createSelector(
  getProductState,
  (state: ProductState) =>
    state.product?.reactivity?.applications as ReactivityApplication[]
)

const getKeyFacts = createSelector(
  getProductState,
  (state: ProductState) => state.product?.keyFacts as KeyFacts
)

const getReactivity = createSelector(
  getProductState,
  (state: ProductState) => state.product?.reactivity
)

const getImages = createSelector(
  getProductState,
  (state: ProductState) => state.product?.images
)

const getPublications = createSelector(
  getProductState,
  (state: ProductState) => state.product?.publications as Publication[]
)

const getDrawerStatus = createSelector(
  getProductState,
  (state: ProductState) => state.showDrawer
)
const getSpecies = createSelector(
  getProductState,
  (state: ProductState) => (state.speciesList as unknown) as ValidationDetail[]
)

const getSelectedAppId = createSelector(
  getProductState,
  (state: ProductState) => state.selectedApplicationId
)

const getSelectedSpecie = createSelector(
  getProductState,
  (state: ProductState) => state.selectedSpecie
)

const getTargetSynonyms = createSelector(
  getProductState,
  (state: ProductState) => state.product?.targetSynonyms?.entitySynonyms
)

const getShortDescription = createSelector(
  getProductState,
  (state: ProductState) => state.product?.summary?.shortDescription
)

const getSizes = createSelector(
  getProductState,
  (state: ProductState) => state.product?.sizes
)

const summaryLoading = createSelector(
  getProductState,
  (state: ProductState) => state.loading.summary
)

const imagesLoading = createSelector(
  getProductState,
  (state: ProductState) => state.loading.images
)

const datasheetLoading = createSelector(
  getProductState,
  (state: ProductState) => state.loading.datasheet
)

const keyFactsLoading = createSelector(
  getProductState,
  (state: ProductState) => state.loading.keyFacts
)

const publicationsLoading = createSelector(
  getProductState,
  (state: ProductState) => state.loading.publications
)

const targetSynonymsLoading = createSelector(
  getProductState,
  (state: ProductState) => state.loading.targetSynonyms
)

const sizesLoading = createSelector(
  getProductState,
  (state: ProductState) => state.loading.sizes
)

const reactivityLoading = createSelector(
  getProductState,
  (state: ProductState) => state.loading.reactivity
)

const supportLoading = createSelector(
  getProductState,
  (state: ProductState) => state.loading.support
)

const getErrorCode = createSelector(
  getProductState,
  (state: ProductState) => state.errorCode
)

export {
  getReactivityApplications,
  getProduct,
  getKeyFacts,
  getReactivity,
  getImages,
  getPublications,
  getDrawerStatus,
  getSpecies,
  getSelectedAppId,
  getSelectedSpecie,
  getTargetSynonyms,
  getShortDescription,
  getSizes,
  summaryLoading,
  imagesLoading,
  datasheetLoading,
  keyFactsLoading,
  publicationsLoading,
  targetSynonymsLoading,
  sizesLoading,
  reactivityLoading,
  supportLoading,
  getErrorCode,
}
