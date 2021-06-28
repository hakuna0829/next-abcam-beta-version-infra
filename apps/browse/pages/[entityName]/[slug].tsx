import { useRouter } from 'next/router'
import getConfig from 'next/config'

import { getEntity } from '@browse/entity/get-entity.query'
import { graphQlClient } from '@browse/services/graphql-client.service'
import { Entity } from '@browse/entity/entity'
import { loadResults } from '@browse/search/search.effects'
import { useEnvironment } from '@browse/environment/Environment.context'

import type { FC } from 'react'
import type { GetServerSideProps, GetServerSidePropsResult } from 'next'
import type {
  EntityCategoryResponse,
  EntityPagePropTypes,
  EntityResponse,
} from '@browse/entity/entity.type'

const { publicRuntimeConfig } = getConfig()

const EntityPage: FC<EntityPagePropTypes> = ({ category, entity }) => {
  const router = useRouter()
  const slug = router.query.slug
  if (!slug) throw new Error('slug not defined')

  const { IMAGES_URI } = useEnvironment()

  return <Entity category={category} entity={entity} hostUri={IMAGES_URI} />
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { slug = '', entityName = '' },
}): Promise<GetServerSidePropsResult<EntityPagePropTypes>> => {
  const { data } = await graphQlClient.query<EntityResponse>({
    query: getEntity(slug.toString(), publicRuntimeConfig.STAGE),
  }).catch(err => {
    console.error('Fetching entity!', err)
    return err
  })
  const entity = data ? data?.entityList?.items[0] : null
  const category = await loadResults<EntityCategoryResponse>('', [
    { label: slug.toString(), type: entityName.toString() },
  ])

  return {
    props: {
      category,
      entity,
    },
  }
}

export default EntityPage
