import React from 'react'
import { style, types } from 'typestyle'

// styles

const baseStyle = { display: 'flex' }

// component

export interface FlexProps extends React.DOMAttributes<HTMLDivElement> {
  direction?: 'column' | 'row' | 'column-reverse' | 'row-reverse'
  grow?: boolean
  style?: types.NestedCSSProperties
  className?: void // to prevent mistakes
}

export const Flex: React.FC<FlexProps> = ({
  direction: flexDirection = 'column',
  grow,
  style: styleOverride,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={style(
        baseStyle,
        { flexDirection, flexGrow: grow ? 1 : undefined },
        styleOverride
      )}
    >
      {children}
    </div>
  )
}
