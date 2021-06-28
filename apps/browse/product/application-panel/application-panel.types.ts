import type {
  Image,
  ReactivityApplication,
  ValidationDetail,
} from '@browse/product/product.type'
import type { ValidationApplicationListPropTypes } from '@browse/product/validation-application-list/validation-application-list.types'

type ApplicationPanelContainerPropTypes = {
  productCode: string
  reactivityApplication: ReactivityApplication
}

type ApplicationPanelPropTypes = ApplicationPanelContainerPropTypes &
  ValidationApplicationListPropTypes & {
    images: Image[]
    withoutTaxon: ValidationDetail[]
  }

export type { ApplicationPanelContainerPropTypes, ApplicationPanelPropTypes }
