import {
  loadKeyfacts,
  loadSummary,
  loadReactivity,
  loadTargetSynonyms,
  loadSupport,
  loadAvailability,
} from '@browse/product/product.effects'
import { Overview } from '@browse/product/overview/overview'
import { ProductTemplate } from '@browse/product/template/template'
import { ContactDistributor } from '@browse/product/contact-distributor/contact-distributor'
import { ReactivityApplications } from '@browse/product/reactivity-applications/reactivity-applications'

import type { GetServerSideProps, GetServerSidePropsResult } from 'next'
import type { OverviewPageProps } from '@browse/product/overview/overview.type'

function OverviewPage(props: OverviewPageProps) {
  const { summary } = props

  return (
    <ProductTemplate
      abbreviation={props.abbreviation}
      bottomContent={<ReactivityApplications reactivity={props.reactivity} />}
      pageTitle={`Abcam - ${summary.name} - overview`}
      topRightContent={
        <ContactDistributor
          summary={summary}
          sizes={props.availability.sizes}
        />
      }
      {...props}
    >
      <Overview {...props} />
    </ProductTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
}): Promise<GetServerSidePropsResult<OverviewPageProps>> => {
  const abbreviation =
    (Array.isArray(query.all) && query.all.find((page) => page !== 'all')) ||
    null
  const productCode = query.productCode?.toString() ?? ''
  const [
    synonyms,
    summary,
    keyFacts,
    reactivity,
    availability,
    support,
  ] = await Promise.all([
    loadTargetSynonyms(productCode),
    loadSummary(productCode),
    loadKeyfacts(productCode),
    loadReactivity(productCode),
    loadAvailability(productCode),
    loadSupport(productCode),
  ])

  return {
    props: {
      abbreviation,
      availability,
      keyFacts,
      reactivity,
      summary,
      support,
      synonyms,
    },
  }
}

export default OverviewPage
