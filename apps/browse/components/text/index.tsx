import React from 'react'
import { style, types } from 'typestyle'
import { px } from 'csx'

import {
  grey20,
  headingLarge,
  headingMedium,
  headingSmall,
  headingXLarge,
  headingXxLarge,
  headingXxxLarge,
} from '@browse/public'

// styles

const baseStyle = {
  fontFamily: 'Eina03-Semibold', // TODO replace
  fontStyle: 'normal', // TODO replace
  fontWeight: 'normal', // TODO replace
  fontStretch: 'normal', // TODO replace
}

const smallStyle = {
  fontSize: headingSmall,
  lineHeight: 1.29, // TODO replace
  letterSpacing: 'normal', // TODO replace
}

const mediumStyle = {
  fontSize: headingMedium,
  lineHeight: 1.33, // TODO replace
  letterSpacing: px(-0.5), // TODO replace
}

const largeStyle = {
  fontSize: headingLarge,
  lineHeight: 1.25, // TODO replace
  letterSpacing: px(-1), // TODO replace
}

const xLargeStyle = {
  fontSize: headingXLarge,
  lineHeight: 1.1, // TODO replace
  letterSpacing: px(-1), // TODO replace
}

const xxLargeStyle = {
  fontSize: headingXxLarge,
  lineHeight: 1, // TODO replace
  letterSpacing: px(-2), // TODO replace
}

const xxxLargeStyle = {
  fontSize: headingXxxLarge,
  lineHeight: 1, // TODO replace
  letterSpacing: px(-1), // TODO replace
}

// component

export interface TextProps<
  TKey extends keyof React.ReactHTML | React.ComponentType = 'span',
  TElement = TKey extends keyof React.ReactHTML ? any : any // TODO types
> extends React.DOMAttributes<TElement> {
  is?: TKey
  color?: string // TODO type?
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge'
  style?: types.NestedCSSProperties
  className?: void // to prevent mistakes
}

export const Text: React.FC<TextProps> = ({
  is = 'span',
  color = grey20, // TODO determine correct default
  size = 'medium', // TODO determine correct default
  style: styleOverride,
  children,
  ...props
}) => {
  const sizeStyle = React.useMemo(() => {
    switch (size) {
      case 'small':
        return smallStyle

      case 'medium':
        return mediumStyle

      case 'large':
        return largeStyle

      case 'xlarge':
        return xLargeStyle

      case 'xxlarge':
        return xxLargeStyle

      case 'xxxlarge':
        return xxxLargeStyle
    }
  }, [size])

  // TODO font styling, especially font size, weight and font color, also letter and line spacing

  props['className'] = style(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    baseStyle,
    sizeStyle,
    { color },
    styleOverride
  ) as any

  return React.createElement(
    is, // HTML element name or React component type
    props,
    children
  )
}
