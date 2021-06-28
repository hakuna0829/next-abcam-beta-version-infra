import { SetCurrentViewInterface } from '@browse/search/column-config/column-config.types'

type PageRoutes = 'quickview' | 'publications'

type Tab = {
  id: PageRoutes
  label: string
}

type TabsPropTypes = {
  items: Tab[]
  currentView: string
  setCurrentView: SetCurrentViewInterface
}

export type { Tab, TabsPropTypes }
