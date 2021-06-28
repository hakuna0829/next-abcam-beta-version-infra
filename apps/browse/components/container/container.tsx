import classnames from 'classnames'
import styles from './container.module.css'

import type { FC, ReactNode } from 'react'

type PropTypes = {
  children: ReactNode
  className?: string
  widthLimited?: boolean
}

export const Container: FC<PropTypes> = ({
  children,
  className: cn,
  widthLimited = false,
}) => {
  const className = classnames(
    styles.container,
    cn,
    widthLimited && styles.widthLimited
  )
  return <div className={className}>{children}</div>
}
