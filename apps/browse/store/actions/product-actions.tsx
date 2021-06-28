import {
  Datasheet,
  Images,
  KeyFacts,
  Publications,
  Reactivity,
  Sizes,
  Summary,
  Support,
  TargetSynonyms,
  ValidationDetail,
} from '@browse/product/product.type'
import {
  SET_SHOW_DRAWER,
  SET_SPECIES,
  SET_APPLICATION_ID,
  SET_SPECIE_ID,
  LOAD_SUMMARY_REQUEST,
  LOAD_SUMMARY_SUCCESS,
  LOAD_SUMMARY_ERROR,
  LOAD_DATASHEET_REQUEST,
  LOAD_DATASHEET_SUCCESS,
  LOAD_DATASHEET_ERROR,
  LOAD_IMAGES_REQUEST,
  LOAD_IMAGES_SUCCESS,
  LOAD_IMAGES_ERROR,
  LOAD_KEY_FACT_REQUEST,
  LOAD_KEY_FACT_SUCCESS,
  LOAD_KEY_FACT_ERROR,
  LOAD_PUBLICATIONS_REQUEST,
  LOAD_PUBLICATIONS_SUCCESS,
  LOAD_PUBLICATIONS_ERROR,
  LOAD_REACTIVITY_REQUEST,
  LOAD_REACTIVITY_SUCCESS,
  LOAD_REACTIVITY_ERROR,
  LOAD_SUPPORT_REQUEST,
  LOAD_SUPPORT_SUCCESS,
  LOAD_SUPPORT_ERROR,
  LOAD_TARGET_SYNONYMS_REQUEST,
  LOAD_TARGET_SYNONYMS_SUCCESS,
  LOAD_TARGET_SYNONYMS_ERROR,
  LOAD_AVAILABILITY_REQUEST,
  LOAD_AVAILABILITY_SUCCESS,
  LOAD_AVAILABILITY_ERROR,
} from '../types/product-types'

// Summary
export const LoadSummaryRequest = () => ({
  type: LOAD_SUMMARY_REQUEST,
})

export const LoadSummarySuccess = (summary: Summary) => ({
  type: LOAD_SUMMARY_SUCCESS,
  payload: summary,
})

export const LoadSummaryError = (errorCode: number) => ({
  type: LOAD_SUMMARY_ERROR,
  payload: errorCode,
})

// Datasheet
export const LoadDatasheetRequest = () => ({
  type: LOAD_DATASHEET_REQUEST,
})

export const LoadDatasheetSuccess = (dataSheet: Datasheet) => ({
  type: LOAD_DATASHEET_SUCCESS,
  payload: dataSheet,
})

export const LoadDatasheetError = (errorCode: number) => ({
  type: LOAD_DATASHEET_ERROR,
  payload: errorCode,
})

// Images
export const LoadImagesRequest = () => ({
  type: LOAD_IMAGES_REQUEST,
})

export const LoadImagesSuccess = (images: Images) => ({
  type: LOAD_IMAGES_SUCCESS,
  payload: images,
})

export const LoadImagesError = (errorCode: number) => ({
  type: LOAD_IMAGES_ERROR,
  payload: errorCode,
})

// KeyFacts
export const LoadKeyFactsRequest = () => ({
  type: LOAD_KEY_FACT_REQUEST,
})

export const LoadKeyFactsSuccess = (keyFacts: KeyFacts) => ({
  type: LOAD_KEY_FACT_SUCCESS,
  payload: keyFacts,
})

export const LoadKeyFactsError = (errorCode: number) => ({
  type: LOAD_KEY_FACT_ERROR,
  payload: errorCode,
})

// Publications
export const LoadPublicationsRequest = () => ({
  type: LOAD_PUBLICATIONS_REQUEST,
})

export const LoadPublicationsSuccess = (publications: Publications) => ({
  type: LOAD_PUBLICATIONS_SUCCESS,
  payload: publications,
})

export const LoadPublicationsError = (errorCode: number) => ({
  type: LOAD_PUBLICATIONS_ERROR,
  payload: errorCode,
})

// Reactivity
export const LoadReactivityRequest = () => ({
  type: LOAD_REACTIVITY_REQUEST,
})

export const LoadReactivitySuccess = (reactivity: Reactivity) => ({
  type: LOAD_REACTIVITY_SUCCESS,
  payload: reactivity,
})

export const LoadReactivityError = (errorCode: number) => ({
  type: LOAD_REACTIVITY_ERROR,
  payload: errorCode,
})

// Support
export const LoadSupportRequest = () => ({
  type: LOAD_SUPPORT_REQUEST,
})

export const LoadSupportSuccess = (support: Support) => ({
  type: LOAD_SUPPORT_SUCCESS,
  payload: support,
})

export const LoadSupportError = (errorCode: number) => ({
  type: LOAD_SUPPORT_ERROR,
  payload: errorCode,
})

// TargetSynonyms
export const LoadTargetSynonymsRequest = () => ({
  type: LOAD_TARGET_SYNONYMS_REQUEST,
})

export const LoadTargetSynonymsSuccess = (targetSynonyms: TargetSynonyms) => ({
  type: LOAD_TARGET_SYNONYMS_SUCCESS,
  payload: targetSynonyms,
})

export const LoadTargetSynonymsError = (errorCode: number) => ({
  type: LOAD_TARGET_SYNONYMS_ERROR,
  payload: errorCode,
})

export const LoadAvailabilityRequest = () => ({
  type: LOAD_AVAILABILITY_REQUEST,
})

export const LoadAvailabilitySuccess = (sizes: Sizes) => ({
  type: LOAD_AVAILABILITY_SUCCESS,
  payload: sizes,
})

export const LoadAvailabilityError = (errorCode: number) => ({
  type: LOAD_AVAILABILITY_ERROR,
  payload: errorCode,
})

export const SetShowDrawer = (showDrawer: boolean) => ({
  type: SET_SHOW_DRAWER,
  payload: showDrawer,
})

export const SetSpecies = (speciesList: ValidationDetail[]) => ({
  type: SET_SPECIES,
  payload: speciesList,
})

export const SetApplicationId = (selectedApplicationId?: string) => ({
  type: SET_APPLICATION_ID,
  payload: selectedApplicationId,
})

export const SetSpecieId = (selectedSpecie?: string) => ({
  type: SET_SPECIE_ID,
  payload: selectedSpecie,
})
