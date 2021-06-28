import type { ReactNode } from 'react'

type WindowSizePropTypes = {
  children: ReactNode
}

type Dimensions = {
  width: number
  height: number
  isSmall: boolean
  isMedium: boolean
  isLarge: boolean
}

export type { Dimensions, WindowSizePropTypes }
