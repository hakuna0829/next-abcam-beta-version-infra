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
} from '@browse/product/product.type'

export const SET_APPLICATION = 'setApplication'
export const SET_SHOW_DRAWER = 'setShowDrawer'
export const SET_CONJ_DRAWER_SPECIES = 'setConjDrawerSpecies'
export const SET_CONJ_APP_ID = 'setConjAppId'
export const SET_CONJ_SPECIE_ID = 'setConjSpecieId'
export const SET_SPECIES = 'setSpecies'
export const SET_APPLICATION_ID = 'setApplicationId'
export const SET_SPECIE_ID = 'setSpecieId'
export const LOAD_SUMMARY_REQUEST = 'loadSummaryRequest'
export const LOAD_SUMMARY_SUCCESS = 'loadSummarySuccess'
export const LOAD_SUMMARY_ERROR = 'loadSummaryError'
export const LOAD_DATASHEET_REQUEST = 'loadDatasheetRequest'
export const LOAD_DATASHEET_SUCCESS = 'loadDatasheetSuccess'
export const LOAD_DATASHEET_ERROR = 'loadDatasheetError'
export const LOAD_IMAGES_REQUEST = 'loadImagesRequest'
export const LOAD_IMAGES_SUCCESS = 'loadImagesSuccess'
export const LOAD_IMAGES_ERROR = 'loadImagesError'
export const LOAD_KEY_FACT_REQUEST = 'loadKeyFactsRequest'
export const LOAD_KEY_FACT_SUCCESS = 'loadKeyFactsSuccess'
export const LOAD_KEY_FACT_ERROR = 'loadKeyFactsError'
export const LOAD_PUBLICATIONS_REQUEST = 'loadPublicationsRequest'
export const LOAD_PUBLICATIONS_SUCCESS = 'loadPublicationsSuccess'
export const LOAD_PUBLICATIONS_ERROR = 'loadPublicationsError'
export const LOAD_REACTIVITY_REQUEST = 'loadReactivityRequest'
export const LOAD_REACTIVITY_SUCCESS = 'loadReactivitySuccess'
export const LOAD_REACTIVITY_ERROR = 'loadReactivityError'
export const LOAD_SUPPORT_REQUEST = 'loadSupportRequest'
export const LOAD_SUPPORT_SUCCESS = 'loadSupportSuccess'
export const LOAD_SUPPORT_ERROR = 'loadSupportError'
export const LOAD_TARGET_SYNONYMS_REQUEST = 'loadTargetSynonymsRequest'
export const LOAD_TARGET_SYNONYMS_SUCCESS = 'loadTargetSynonymsSuccess'
export const LOAD_TARGET_SYNONYMS_ERROR = 'loadTargetSynonymsError'
export const LOAD_AVAILABILITY_REQUEST = 'loadAvailabilityRequest'
export const LOAD_AVAILABILITY_SUCCESS = 'loadAvailabilitySuccess'
export const LOAD_AVAILABILITY_ERROR = 'loadAvailabilityError'

// Summary
interface LoadSummaryRequest {
  type: typeof LOAD_SUMMARY_REQUEST
}

interface LoadSummarySuccess {
  type: typeof LOAD_SUMMARY_SUCCESS
  payload: Summary
}

interface LoadSummaryError {
  payload: any
  type: typeof LOAD_SUMMARY_ERROR
}

// Datasheet
interface LoadDatasheetRequest {
  type: typeof LOAD_DATASHEET_REQUEST
}

interface LoadDatasheetSuccess {
  type: typeof LOAD_DATASHEET_SUCCESS
  payload: Datasheet
}

interface LoadDatasheetError {
  payload: any
  type: typeof LOAD_DATASHEET_ERROR
}

// Images
interface LoadImagesRequest {
  type: typeof LOAD_IMAGES_REQUEST
}

interface LoadImagesSuccess {
  type: typeof LOAD_IMAGES_SUCCESS
  payload: Images
}

interface LoadImagesError {
  payload: any
  type: typeof LOAD_IMAGES_ERROR
}

// KeyFacts
interface LoadKeyFactsRequest {
  type: typeof LOAD_KEY_FACT_REQUEST
}

interface LoadKeyFactsSuccess {
  type: typeof LOAD_KEY_FACT_SUCCESS
  payload: KeyFacts
}

interface LoadKeyFactsError {
  payload: any
  type: typeof LOAD_KEY_FACT_ERROR
}

// Publications
interface LoadPublicationsRequest {
  type: typeof LOAD_PUBLICATIONS_REQUEST
}

interface LoadPublicationsSuccess {
  type: typeof LOAD_PUBLICATIONS_SUCCESS
  payload: Publications
}

interface LoadPublicationsError {
  payload: any
  type: typeof LOAD_PUBLICATIONS_ERROR
}

// Reactivity
interface LoadReactivityRequest {
  type: typeof LOAD_REACTIVITY_REQUEST
}

interface LoadReactivitySuccess {
  type: typeof LOAD_REACTIVITY_SUCCESS
  payload: Reactivity
}

interface LoadReactivityError {
  payload: any
  type: typeof LOAD_REACTIVITY_ERROR
}

// Support
interface LoadSupportRequest {
  type: typeof LOAD_SUPPORT_REQUEST
}

interface LoadSupportSuccess {
  type: typeof LOAD_SUPPORT_SUCCESS
  payload: Support
}

interface LoadSupportError {
  payload: any
  type: typeof LOAD_SUPPORT_ERROR
}

// TargetSynonyms
interface LoadTargetSynonymsRequest {
  type: typeof LOAD_TARGET_SYNONYMS_REQUEST
}

interface LoadTargetSynonymsSuccess {
  type: typeof LOAD_TARGET_SYNONYMS_SUCCESS
  payload: TargetSynonyms
}

interface LoadAvailabilityRequest {
  type: typeof LOAD_AVAILABILITY_REQUEST
}

interface LoadAvailabilitySuccess {
  type: typeof LOAD_AVAILABILITY_SUCCESS
  payload: Sizes
}

interface LoadAvailabilityError {
  payload: any
  type: typeof LOAD_AVAILABILITY_ERROR
}

interface LoadTargetSynonymsError {
  type: typeof LOAD_TARGET_SYNONYMS_ERROR
  payload: string
}

interface SetShowDrawer {
  type: typeof SET_SHOW_DRAWER
  payload: boolean
}

interface SetSpecies {
  type: typeof SET_SPECIES
  payload: string[]
}

interface SetApplicationId {
  type: typeof SET_APPLICATION_ID
  payload: string
}

interface SetSpecieId {
  type: typeof SET_SPECIE_ID
  payload: string
}

export type ProductActionTypes =
  | LoadSummaryRequest
  | LoadSummarySuccess
  | LoadSummaryError
  | LoadDatasheetRequest
  | LoadDatasheetSuccess
  | LoadDatasheetError
  | LoadImagesRequest
  | LoadImagesSuccess
  | LoadImagesError
  | LoadKeyFactsRequest
  | LoadKeyFactsSuccess
  | LoadKeyFactsError
  | LoadPublicationsRequest
  | LoadPublicationsSuccess
  | LoadPublicationsError
  | LoadReactivityRequest
  | LoadReactivitySuccess
  | LoadReactivityError
  | LoadSupportRequest
  | LoadSupportSuccess
  | LoadSupportError
  | LoadTargetSynonymsRequest
  | LoadTargetSynonymsSuccess
  | LoadTargetSynonymsError
  | LoadAvailabilityRequest
  | LoadAvailabilitySuccess
  | LoadAvailabilityError
  | SetSpecies
  | SetShowDrawer
  | SetApplicationId
  | SetSpecieId
