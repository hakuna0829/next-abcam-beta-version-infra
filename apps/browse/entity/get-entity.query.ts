import { gql } from '@apollo/client'

import type { Stage } from './entity.type'

const getEntity = (slug: string, stage: Stage) => {
  return gql`
    query GetEntity {
      entityList(filter: {
        slug: {_expressions: {_operator: EQUALS, value: "${slug}"}},
        stage: {_expressions: {_operator: EQUALS, value: "${stage}"}}
      }) {
        items {
          description {
            plaintext
          }
          image {
            ... on ImageRef {
              _path
              mimeType
              width
              height
            }
          }
          stage
          synonyms
          title
        }
      }
  }`
}

export { getEntity }
