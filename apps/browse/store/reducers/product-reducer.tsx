import produce, { Draft } from 'immer'
import { State } from '../index'
import {
  LOAD_AVAILABILITY_ERROR,
  LOAD_AVAILABILITY_REQUEST,
  LOAD_AVAILABILITY_SUCCESS,
  LOAD_DATASHEET_ERROR,
  LOAD_DATASHEET_REQUEST,
  LOAD_DATASHEET_SUCCESS,
  LOAD_IMAGES_ERROR,
  LOAD_IMAGES_REQUEST,
  LOAD_IMAGES_SUCCESS,
  LOAD_KEY_FACT_ERROR,
  LOAD_KEY_FACT_REQUEST,
  LOAD_KEY_FACT_SUCCESS,
  LOAD_PUBLICATIONS_ERROR,
  LOAD_PUBLICATIONS_REQUEST,
  LOAD_PUBLICATIONS_SUCCESS,
  LOAD_REACTIVITY_ERROR,
  LOAD_REACTIVITY_REQUEST,
  LOAD_REACTIVITY_SUCCESS,
  LOAD_SUMMARY_ERROR,
  LOAD_SUMMARY_REQUEST,
  LOAD_SUMMARY_SUCCESS,
  LOAD_SUPPORT_ERROR,
  LOAD_SUPPORT_REQUEST,
  LOAD_SUPPORT_SUCCESS,
  LOAD_TARGET_SYNONYMS_ERROR,
  LOAD_TARGET_SYNONYMS_REQUEST,
  LOAD_TARGET_SYNONYMS_SUCCESS,
  ProductActionTypes,
  SET_APPLICATION_ID,
  SET_CONJ_APP_ID,
  SET_CONJ_DRAWER_SPECIES,
  SET_CONJ_SPECIE_ID,
  SET_SHOW_DRAWER,
  SET_SPECIE_ID,
  SET_SPECIES,
} from '../types/product-types'
import {
  Datasheet,
  KeyFacts,
  Publication,
  Reactivity,
  Size,
  Summary,
  TargetSynonyms,
  Support,
  Image,
} from '@browse/product/product.type'

export interface ProductState {
  loading: {
    summary: boolean
    datasheet: boolean
    images: boolean
    keyFacts: boolean
    publications: boolean
    reactivity: boolean
    support: boolean
    targetSynonyms: boolean
    sizes: boolean
  }
  product: {
    summary: Summary
    datasheet: Datasheet
    images: Image[]
    keyFacts: KeyFacts
    publications: Publication[]
    reactivity: Reactivity
    support: Support
    targetSynonyms: TargetSynonyms
    sizes: Size[]
  }
  showDrawer: boolean
  speciesList: string[]
  selectedApplicationId: string | undefined
  selectedSpecie: string | undefined
  errorCode: number | undefined
}
export const initialState: ProductState = {
  loading: {
    summary: true,
    datasheet: true,
    images: true,
    keyFacts: true,
    publications: true,
    reactivity: true,
    support: true,
    targetSynonyms: true,
    sizes: true,
  },
  product: {
    summary: {} as Summary,
    datasheet: {} as Datasheet,
    images: [],
    keyFacts: {} as KeyFacts,
    publications: [],
    reactivity: { applications: [] } as Reactivity,
    support: { protocols: [], howToStore: [] } as Support,
    targetSynonyms: {
      entitySynonyms: [],
      validatedApplications: [],
    } as TargetSynonyms,
    sizes: [],
  },
  showDrawer: false,
  speciesList: [],
  selectedApplicationId: undefined,
  selectedSpecie: undefined,
  errorCode: undefined,
} as ProductState

const productReducer = (state = initialState, action: ProductActionTypes) => {
  switch (action.type) {
    case LOAD_SUMMARY_REQUEST: {
      return produce(state, (draft: Draft<ProductState>) => {
        draft.loading.summary = true
      })
    }
    case LOAD_SUMMARY_SUCCESS: {
      return produce(state, (draft: Draft<ProductState>) => {
        draft.loading.summary = false
        draft.product.summary = action.payload
      })
    }
    case LOAD_SUMMARY_ERROR: {
      return produce(state, (draft: State) => {
        draft.product.summary = undefined
        draft.loading.summary = false
        draft.errorCode = action.payload
      })
    }

    case LOAD_DATASHEET_REQUEST: {
      return produce(state, (draft: State) => {
        draft.loading.datasheet = true
      })
    }
    case LOAD_DATASHEET_SUCCESS: {
      return produce(state, (draft: State) => {
        draft.loading.datasheet = false
        draft.product.datasheet = action.payload
      })
    }
    case LOAD_DATASHEET_ERROR: {
      return produce(state, (draft: State) => {
        draft.product.datasheet = undefined
        draft.loading.datasheet = false
        draft.errorCode = action.payload
      })
    }

    case LOAD_IMAGES_REQUEST: {
      return produce(state, (draft: State) => {
        draft.loading.images = true
      })
    }
    case LOAD_IMAGES_SUCCESS: {
      return produce(state, (draft: State) => {
        draft.loading.images = false
        draft.product.images = action.payload.images
      })
    }
    case LOAD_IMAGES_ERROR: {
      return produce(state, (draft: State) => {
        draft.product.images = undefined
        draft.loading.images = false
        draft.errorCode = action.payload
      })
    }

    case LOAD_KEY_FACT_REQUEST: {
      return produce(state, (draft: State) => {
        draft.loading.keyFacts = true
      })
    }
    case LOAD_KEY_FACT_SUCCESS: {
      return produce(state, (draft: State) => {
        draft.loading.keyFacts = false
        draft.product.keyFacts = action.payload
      })
    }
    case LOAD_KEY_FACT_ERROR: {
      return produce(state, (draft: State) => {
        draft.product.keyFacts = undefined
        draft.loading.keyFacts = false
        draft.errorCode = action.payload
      })
    }

    case LOAD_PUBLICATIONS_REQUEST: {
      return produce(state, (draft: State) => {
        draft.loading.publications = true
      })
    }
    case LOAD_PUBLICATIONS_SUCCESS: {
      return produce(state, (draft: State) => {
        draft.loading.publications = false
        draft.product.publications = action.payload.publications
      })
    }
    case LOAD_PUBLICATIONS_ERROR: {
      return produce(state, (draft: State) => {
        draft.product.publications = undefined
        draft.loading.publications = false
        draft.errorCode = action.payload
      })
    }

    case LOAD_REACTIVITY_REQUEST: {
      return produce(state, (draft: State) => {
        draft.loading.reactivity = true
      })
    }
    case LOAD_REACTIVITY_SUCCESS: {
      return produce(state, (draft: State) => {
        draft.loading.reactivity = false
        draft.product.reactivity = action.payload
      })
    }
    case LOAD_REACTIVITY_ERROR: {
      return produce(state, (draft: State) => {
        draft.product.reactivity = undefined
        draft.loading.reactivity = false
        draft.errorCode = action.payload
      })
    }

    case LOAD_SUPPORT_REQUEST: {
      return produce(state, (draft: State) => {
        draft.loading.reactivity = true
      })
    }
    case LOAD_SUPPORT_SUCCESS: {
      return produce(state, (draft: State) => {
        draft.loading.support = false
        draft.product.support = action.payload
      })
    }
    case LOAD_SUPPORT_ERROR: {
      return produce(state, (draft: State) => {
        draft.product.support = undefined
        draft.loading.support = false
        draft.errorCode = action.payload
      })
    }

    case LOAD_TARGET_SYNONYMS_REQUEST: {
      return produce(state, (draft: State) => {
        draft.loading.targetSynonyms = true
      })
    }
    case LOAD_TARGET_SYNONYMS_SUCCESS: {
      return produce(state, (draft: State) => {
        draft.loading.targetSynonyms = false
        console.log(draft.product)
        draft.product.targetSynonyms = {
          entitySynonyms: [],
          validatedApplications: [],
        }
        draft.product.targetSynonyms.entitySynonyms =
          action.payload.entitySynonyms
      })
    }
    case LOAD_TARGET_SYNONYMS_ERROR: {
      return produce(state, (draft: State) => {
        draft.product.targetSynonyms = undefined
        draft.loading.targetSynonyms = false
        draft.errorCode = action.payload
      })
    }
    case LOAD_AVAILABILITY_REQUEST: {
      return produce(state, (draft: State) => {
        draft.loading.sizes = true
      })
    }
    case LOAD_AVAILABILITY_SUCCESS: {
      return produce(state, (draft: State) => {
        draft.loading.sizes = false
        draft.product.sizes = action.payload.sizes
      })
    }
    case LOAD_AVAILABILITY_ERROR: {
      return produce(state, (draft: State) => {
        draft.product.sizes = undefined
        draft.loading.sizes = false
        draft.errorCode = action.payload
      })
    }

    case SET_SHOW_DRAWER: {
      return produce(state, (draft: State) => {
        draft.showDrawer = action.payload
      })
    }

    case SET_SPECIES: {
      return produce(state, (draft: State) => {
        draft.speciesList = action.payload
      })
    }

    case SET_APPLICATION_ID: {
      return produce(state, (draft: State) => {
        draft.selectedApplicationId = action.payload
      })
    }

    case SET_SPECIE_ID: {
      return produce(state, (draft: State) => {
        draft.selectedSpecie = action.payload
      })
    }

    // case SET_SHOW_DRAWER: {
    //     return produce(state, (draft: State) => {
    //         draft.conjugationDrawer.showDrawer = action.showDrawer;
    //     });
    // }

    default:
      return { ...state }
  }
}

// eslint-disable-next-line import/no-default-export
export default productReducer
