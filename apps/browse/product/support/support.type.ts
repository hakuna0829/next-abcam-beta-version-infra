import { Summary, Support, Synonyms } from '@browse/product/product.type'

type SupportContainerPropTypes = {
  support: Support
}

type SupportPropTypes = SupportContainerPropTypes & {
  onPrintDatasheetClick: () => void
}

type SupportPageProps = SupportContainerPropTypes & {
  summary: Summary
  synonyms: Synonyms
}

export type { SupportPageProps, SupportPropTypes, SupportContainerPropTypes }
