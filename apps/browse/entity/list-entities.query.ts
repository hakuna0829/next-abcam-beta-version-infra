import { gql } from '@apollo/client'

import type { DocumentNode } from '@apollo/client'
import type { Stage } from './entity.type'

const listEntities = (stage: Stage): DocumentNode => {
  return gql`
    query ListEntities {
      entityList(filter: {
        stage: {_expressions: {_operator: EQUALS, value: "${stage}"}}
      }) {
        items {
          slug
          title
        }
    }
  }`
}

export { listEntities }
