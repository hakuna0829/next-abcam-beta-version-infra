import { graphql } from 'msw'
import listEntries from './data/list-entries.mock.json'

import { EntityResponse } from '../entity/entity.type'

export const handlers = [
  graphql.query<EntityResponse>('ListEntities', (req, res, ctx) => {
    return res(ctx.data(listEntries))
  }),
]
