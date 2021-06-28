import type { Stage } from '@browse/entity/entity.type'

type Environment = {
  GRAPHQL_AUTHORIZATION: string
  GRAPHQL_ENDPOINT: string
  GRAPHQL_HOST_URI: string
  HOST_URI: string
  IMAGES_URI: string
  STAGE: Stage
  HOTJAR_SURVEY: string
  ELOQUA_URL: string
}

export type { Environment }
