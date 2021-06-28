import React, { useEffect, useState } from 'react'
import debounce from 'lodash.debounce'

import { breakpoints } from './breakpoints'

import type { FC } from 'react'
import type { Dimensions, WindowSizePropTypes } from './window-resize.types'

const WindowResizeContext = React.createContext<Dimensions | undefined>(
  undefined
)

const WindowResizeProvider: FC<WindowSizePropTypes> = ({ children }) => {
  const [dimensions, setDimensions] = useState<Dimensions | undefined>(
    undefined
  )

  function handleResize() {
    const windowWidth = window.innerWidth
    setDimensions({
      width: windowWidth,
      height: window.innerHeight,
      isSmall: windowWidth <= breakpoints.small,
      isMedium:
        windowWidth > breakpoints.small && windowWidth < breakpoints.medium,
      isLarge: windowWidth >= breakpoints.medium,
    })
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', debounce(handleResize, 250))
    return () =>
      window.removeEventListener('resize', debounce(handleResize, 250))
  }, [])

  return (
    <WindowResizeContext.Provider value={dimensions}>
      {children}
    </WindowResizeContext.Provider>
  )
}

export { WindowResizeContext, WindowResizeProvider }
