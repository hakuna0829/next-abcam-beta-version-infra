import type { ReactNode } from 'react'
import type { TagCodes } from './badge/badge.types'

export type ProductContextProps = {
  abbreviation: string | null
  children?: ReactNode
  productCode: string
}

export type Applications = {
  application: Application[]
}

export type Application = {
  name: string
  usageNotes: string
}
export type Antibody = {
  description: string
  isotype: string
  clonality: string
  cloneNumber: string
  conjugation: Conjugation
  positiveControl: string
  immunogen: Immunogen
}

export type Availability = {
  sizes: Size[]
}

type Conjugation = {
  label: string
  excitation: string
  emission: string
}

type Conjugations = {
  value: string
  versions: Version[]
}

export type Datasheet = {
  antibody: Antibody
  storage: Storage
  applications: Applications
  notes: string
}

export type Immunogen = {
  description: string
  sequence: string
  databaseLink: DatabaseLink[]
  alternativeNames: string[]
  hostSpecies: string[]
}
export type DatabaseLink = {
  type: string
  value: string
  url: string
}

type Formulations = {
  value: string
  versions: Version[]
}

export type Image = {
  altText: string
  height: number
  image_legend: string
  image_url: string
  title: string
  width: number
}

type ImageUrl = {
  title: string
  url: string
}

type Immunogen2 = {
  databaseLink: {
    value: string
    url: string
  }
  description: string
  sequence: string
}

export type KeyFacts = {
  conjugations: Conjugations
  formulations: Formulations
  hostTaxa: string
  immunogen: Immunogen2
  isoType: string
  productTags: ProductTag[]
  type: string
  version: number
}

export type ProductTag = {
  tagCode: TagCodes
}

type Protocol = {
  label: string
  url: string
}

export type Reactivity = {
  applications: ReactivityApplication[]
}

export type ReactivityApplication = {
  abbreviation: string
  applicationId: string
  evidence: ValidationDetail[]
  imageUrls: ImageUrl[]
  name: string
  order: string
  predictedReactivity: ValidationDetail[]
  publications: number
  reactivity: ValidationDetail[]
  recommendedDilution: string
}

export type Size = {
  volumeOrMass: string
  uom: string
}

export type Summary = {
  name: string
  productCode: string
  shortDescription: string
  type: string
  url: string
}

export type Support = {
  protocols: Protocol[]
  howToStore: string[]
}

export type Synonyms = {
  entitySynonyms: Array<string>
}

export type ValidationDetail = {
  guaranteed: boolean
  taxon: string
  taxonId: string
  percentageOfSimilarity: string
  predicted: boolean
  publications: number
  reviews: number
}

export type Version = {
  description: string
  categoryType: string
  conjugation?: Conjugation
  name: string
  productCode: string
  productTags: ProductTag[]
  url: string
}

export type Publication = {
  pubmedid: number
  authors: string
  title: string
  journal: string
  volume: number
  pages: number
  year: number
}

export type Evidence = {
  taxonId: string
  taxon: string
  gauranteed: boolean
  predicted: boolean
  willNotWork: boolean
  publications: number
  reviews: number
}

export type Images = {
  images: Image[]
}

export type Publications = {
  publications: Publication[]
}

export type Sizes = {
  sizes: Size[]
}

export type TargetSynonyms = {
  entitySynonyms: string[]
  validatedApplications: any[]
}
