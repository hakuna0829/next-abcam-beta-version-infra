import { useContext } from 'react'
import { WindowResizeContext } from './window-resize.context'

import type { Dimensions } from './window-resize.types'

const useWindowResize = (): Dimensions => {
  const context = useContext(WindowResizeContext)
  if (context === undefined)
    throw new Error('useWindowResize must be within WindowResizeProvider')

  return context
}
export { useWindowResize }
