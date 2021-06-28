import {
  loadSummary,
  loadDatasheet,
  loadTargetSynonyms,
} from '@browse/product/product.effects'
import { Datasheet } from '@browse/product/datasheet/datasheet'
import { ProductTemplate } from '@browse/product/template/template'

import type { GetServerSideProps, GetServerSidePropsResult } from 'next'
import type { DatasheetPageProps } from '@browse/product/datasheet/datasheet.type'

function DatasheetPage(props: DatasheetPageProps) {
  const { summary } = props
  const onDownload = () => {
    window.print()
  }
  return (
    <ProductTemplate
      {...props}
      onDownload={onDownload}
      pageTitle={`Abcam - ${summary.name} - datasheet`}
      title="Datasheet"
    >
      <Datasheet {...props} />
    </ProductTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<GetServerSidePropsResult<DatasheetPageProps>> => {
  const productCode = context.query.productCode?.toString() ?? ''
  const [summary, dataSheet, synonyms] = await Promise.all([
    loadSummary(productCode),
    loadDatasheet(productCode),
    loadTargetSynonyms(productCode),
  ])

  return {
    props: {
      dataSheet,
      summary,
      synonyms,
    },
  }
}

export default DatasheetPage
