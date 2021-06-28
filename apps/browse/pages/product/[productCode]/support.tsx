import {
  loadSummary,
  loadSupport,
  loadTargetSynonyms,
} from '@browse/product/product.effects'
import { SupportContainer } from '@browse/product/support/support.container'
import { ProductTemplate } from '@browse/product/template/template'

import type { GetServerSideProps, GetServerSidePropsResult } from 'next'
import type { SupportPageProps } from '@browse/product/support/support.type'

function SupportPage(props: SupportPageProps) {
  const { summary } = props
  return (
    <ProductTemplate
      {...props}
      pageTitle={`Abcam - ${summary.name} - support`}
      title="Support &amp; downloads"
    >
      <SupportContainer {...props} />
    </ProductTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { productCode: pc = '' },
}): Promise<GetServerSidePropsResult<SupportPageProps>> => {
  const productCode = pc.toString()
  const [summary, support, synonyms] = await Promise.all([
    loadSummary(productCode),
    loadSupport(productCode),
    loadTargetSynonyms(productCode),
  ])

  return {
    props: {
      summary,
      support,
      synonyms,
    },
  }
}

export default SupportPage
