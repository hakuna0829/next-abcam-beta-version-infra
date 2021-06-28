import type {
  Availability,
  KeyFacts,
  Reactivity,
  Summary,
  Support,
  Synonyms,
} from '@browse/product/product.type'

type OverviewPageProps = {
  abbreviation: string | null
  availability: Availability
  keyFacts: KeyFacts
  reactivity: Reactivity
  summary: Summary
  support: Support
  synonyms: Synonyms
}

export type { OverviewPageProps }
