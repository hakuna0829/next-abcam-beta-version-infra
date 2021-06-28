import type { Entity as SearchEntity } from '@browse/search/search.type'

type Entity = {
  description: {
    plaintext: string
  }
  image: {
    _path: string
    mimeType: string
    width: number
    height: number
  }
  stage?: Stage
  slug: string
  synonyms: string
  title: string
}

export type EntityCategoryResponse = {
  entity: SearchEntity
}

type EntityResponse = {
  entityList: {
    items: Array<Entity>
  }
}

type EntityContainerPropTypes = {
  target: string
}

type PropTypes = {
  category: EntityCategoryResponse
  items: Array<Entity>
  hostUri: string
}

type Stage = 'staging' | 'production'

export type {
  Entity,
  EntityContainerPropTypes,
  EntityResponse,
  PropTypes,
  Stage,
}
