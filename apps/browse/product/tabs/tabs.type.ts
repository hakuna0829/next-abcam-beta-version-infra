type PageRoutes = 'overview' | 'datasheet' | 'support'

type Tab = {
  id: PageRoutes
  isActive?: boolean
  label: string
}

type TabsPropTypes = {
  items: Tab[]
  productCode: string
}

export type { Tab, TabsPropTypes }
