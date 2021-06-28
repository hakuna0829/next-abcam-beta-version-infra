import { ProductService } from '@browse/product/product.service'
import {
  Availability,
  Datasheet,
  Image,
  KeyFacts,
  Reactivity,
  Summary,
  Support,
  Synonyms,
  Publications,
} from '@browse/product/product.type'

export const loadSummary = async (productCode: string): Promise<Summary> => {
  return ProductService.getSummary(productCode)
    .then((summary) => summary.data)
    .catch((e) => console.error(e.response.status))
}

export const loadDatasheet = async (
  productCode: string
): Promise<Datasheet> => {
  return ProductService.getDatasheet(productCode)
    .then((datasheet) => datasheet.data)
    .catch((e) => console.error(e.response.status))
}

export const loadImages = async (
  productCode: string,
  applicationId: string | undefined,
  taxonId?: string
): Promise<Image[]> => {
  return ProductService.getImages(productCode, applicationId, taxonId)
    .then((images) => images.data.images)
    .catch((e) => console.error(e.response.status))
}

export const loadKeyfacts = async (productCode: string): Promise<KeyFacts> => {
  return ProductService.getKeyfacts(productCode)
    .then((keyfacts) => keyfacts.data)
    .catch((e) => console.error('keyfacts error', e))
}

export const loadPublications = async (
  productCode: string,
  applicationId?: string,
  taxonId?: string
): Promise<Publications> => {
  return ProductService.getPublications(productCode, applicationId, taxonId)
    .then((publications) => publications.data)
    .catch((e) => console.error('keyfacts error', e))
}

export const loadReactivity = async (
  productCode: string
): Promise<Reactivity> => {
  return ProductService.getReactivity(productCode)
    .then((reactivity) => reactivity.data)
    .catch((e) => console.error(e.response.status))
}

export const loadSupport = async (productCode: string): Promise<Support> => {
  return ProductService.getSupport(productCode)
    .then((support) => support.data)
    .catch((e) => console.error(e.response.status))
}

export const loadTargetSynonyms = async (
  productCode: string
): Promise<Synonyms> => {
  return ProductService.getTargetSynonyms(productCode)
    .then((targetSynonyms) => targetSynonyms.data)
    .catch((e) => console.error(e))
}

export const loadAvailability = async (
  productCode: string
): Promise<Availability> => {
  return ProductService.getAvailability(productCode)
    .then((sizes) => sizes.data)
    .catch((e) => console.error(e.response.status))
}
