import type { ReactNode } from 'react'
import type { Summary, Synonyms } from '@browse/product/product.type'

type TemplatePropTypes = {
  abbreviation?: string | null
  bottomContent?: ReactNode
  children: ReactNode
  onDownload?: () => void
  pageTitle?: string
  summary: Summary
  synonyms: Synonyms
  topRightContent?: ReactNode
  title?: string
}

export type { TemplatePropTypes }
