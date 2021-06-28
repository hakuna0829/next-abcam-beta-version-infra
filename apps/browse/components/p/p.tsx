import classnames from 'classnames'
import styles from './p.module.css'
import type { FC, ReactNode } from 'react'

type PropTypes = {
  children: ReactNode
  className?: string
  color?: 'normal' | 'light'
}

export const P: FC<PropTypes> = ({
  children,
  className: cn,
  color,
  ...otherProps
}) => {
  const className = classnames(
    styles.paragraph,
    color === 'light' ? styles.light : styles.dark,
    cn
  )
  return (
    <p className={className} {...otherProps}>
      {children}
    </p>
  )
}
