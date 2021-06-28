import { State } from '../index'
import {
  Image,
  Publication,
  ReactivityApplication,
} from '@browse/product/product.type'

const getSearch = (state: State) => state.searchResultReducer?.search

const getReactivityApplications = (state: State) =>
  state.productReducer.product?.reactivity
    ?.applications as ReactivityApplication[]

const getProduct = (state: State) => state.productReducer.product
const getKeyFacts = (state: State) => state.productReducer.product?.keyFacts
const getReactivity = (state: State) => state.productReducer.product?.reactivity
const getImages = (state: State) =>
  state.productReducer.product?.images?.images as Image[]
const getApplication = (state: State) =>
  state.productReducer.product?.application
const getPublications = (state: State) =>
  state.productReducer.product?.publications?.publications
    ?.publications as Publication[]
const getProductItems = (state: State) =>
  state.searchResultReducer?.search?.result?.products?.items || []
const getProductCode = (state: State) =>
  state.searchResultReducer?.search?.productCode || ''

const getDrawerStatus = (state: State) =>
  state.productReducer.conjugationDrawer?.showDrawer
const getSpecies = (state: State) =>
  state.productReducer.conjugationDrawer?.species
const getSelectedAppId = (state: State) =>
  state.productReducer.conjugationDrawer?.selectedAppId
const getSelectedSpecie = (state: State) =>
  state.productReducer.conjugationDrawer?.selectedSpecie
const getSearchFixed = (state: State) => state.search.fixAsHeader

const getIsHomePage = (state: State) => state.basic.isHomePage
const getSearchStyle = (state: State) => state.basic.searchStyle
const getGlobalErrorCode = (state: State) => state.basic.errorCode

export {
  getSearch,
  getReactivityApplications,
  getProduct,
  getKeyFacts,
  getReactivity,
  getImages,
  getApplication,
  getPublications,
  getProductItems,
  getProductCode,
  getDrawerStatus,
  getSpecies,
  getSelectedAppId,
  getSelectedSpecie,
  getSearchFixed,
  getIsHomePage,
  getSearchStyle,
  getGlobalErrorCode,
}
