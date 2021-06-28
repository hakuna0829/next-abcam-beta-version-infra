import { ThunkAction } from 'redux-thunk'
import { ApplicationState } from '../base-types'
import {
  LoadAvailabilityError,
  LoadAvailabilityRequest,
  LoadAvailabilitySuccess,
  LoadDatasheetError,
  LoadDatasheetRequest,
  LoadDatasheetSuccess,
  LoadImagesError,
  LoadImagesRequest,
  LoadImagesSuccess,
  LoadKeyFactsError,
  LoadKeyFactsRequest,
  LoadKeyFactsSuccess,
  LoadPublicationsError,
  LoadPublicationsRequest,
  LoadPublicationsSuccess,
  LoadReactivityError,
  LoadReactivityRequest,
  LoadReactivitySuccess,
  LoadSummaryError,
  LoadSummaryRequest,
  LoadSummarySuccess,
  LoadSupportError,
  LoadSupportRequest,
  LoadSupportSuccess,
  LoadTargetSynonymsError,
  LoadTargetSynonymsRequest,
  LoadTargetSynonymsSuccess,
} from '../actions/product-actions'
import { ProductService } from '@browse/product/product.service'

type Effect = ThunkAction<any, ApplicationState, any, any>

export const loadSummary = (productCode: string): Effect => (dispatch) => {
  dispatch(LoadSummaryRequest())

  return ProductService.getSummary(productCode)
    .then((summary) => {
      const _summary = summary.data
      return dispatch(LoadSummarySuccess(_summary))
    })
    .catch((e) => dispatch(LoadSummaryError(e.response.status)))
}

export const loadDatasheet = (productCode: string): Effect => (dispatch) => {
  dispatch(LoadDatasheetRequest())

  return ProductService.getDatasheet(productCode)
    .then((datasheet) => {
      console.log(datasheet)
      const _datasheet = datasheet.data
      return dispatch(LoadDatasheetSuccess(_datasheet))
    })
    .catch((e) => dispatch(LoadDatasheetError(e.response.status)))
}

export const loadImages = (
  productCode: string,
  applicationId: string,
  taxonId?: string
): Effect => (dispatch) => {
  dispatch(LoadImagesRequest())

  return ProductService.getImages(productCode, applicationId, taxonId)
    .then((images) => {
      console.log(images)
      const _images = images.data
      return dispatch(LoadImagesSuccess(_images))
    })
    .catch((e) => dispatch(LoadImagesError(e.response.status)))
}

export const loadKeyfacts = (productCode: string): Effect => (dispatch) => {
  dispatch(LoadKeyFactsRequest())

  return ProductService.getKeyfacts(productCode)
    .then((keyfacts) => {
      console.log(keyfacts)
      const _keyfacts = keyfacts.data
      return dispatch(LoadKeyFactsSuccess(_keyfacts))
    })
    .catch((e) => dispatch(LoadKeyFactsError(e.response.status)))
}

export const loadPublications = (
  productCode: string,
  applicationId?: string,
  taxonId?: string
): Effect => (dispatch) => {
  dispatch(LoadPublicationsRequest())

  return ProductService.getPublications(productCode, applicationId, taxonId)
    .then((publications) => {
      console.log(publications)
      const _publications = publications.data
      return dispatch(LoadPublicationsSuccess(_publications))
    })
    .catch((e) => dispatch(LoadPublicationsError(e.response.status)))
}

export const loadReactivity = (productCode: string): Effect => (dispatch) => {
  dispatch(LoadReactivityRequest())

  return ProductService.getReactivity(productCode)
    .then((reactivity) => {
      console.log(reactivity)
      const _reactivity = reactivity.data
      return dispatch(LoadReactivitySuccess(_reactivity))
    })
    .catch((e) => dispatch(LoadReactivityError(e.response.status)))
}

export const loadSupport = (productCode: string): Effect => (dispatch) => {
  dispatch(LoadSupportRequest())

  return ProductService.getSupport(productCode)
    .then((support) => {
      console.log(support)
      const _support = support.data
      return dispatch(LoadSupportSuccess(_support))
    })
    .catch((e) => dispatch(LoadSupportError(e.response.status)))
}

export const loadTargetSynonyms = (productCode: string): Effect => (
  dispatch
) => {
  dispatch(LoadTargetSynonymsRequest())

  return ProductService.getTargetSynonyms(productCode)
    .then((targetSynonyms) => {
      const _targetSynonyms = targetSynonyms.data
      return dispatch(LoadTargetSynonymsSuccess(_targetSynonyms))
    })
    .catch((e) => {
      console.log(e)
      dispatch(LoadTargetSynonymsError(e.response.status))
    })
}

export const loadAvailability = (productCode: string): Effect => (dispatch) => {
  dispatch(LoadAvailabilityRequest())

  return ProductService.getAvailability(productCode)
    .then((sizes) => {
      const _sizes = sizes.data
      return dispatch(LoadAvailabilitySuccess(_sizes))
    })
    .catch((e) => dispatch(LoadAvailabilityError(e.response.status)))
}
