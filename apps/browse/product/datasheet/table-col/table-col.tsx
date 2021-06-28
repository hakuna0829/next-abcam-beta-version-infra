import classnames from 'classnames'
import styles from './table-col.module.css'
import type { FC } from 'react'
import type { TableColProps } from './table-col.props'

const TableCol: FC<TableColProps> = ({
  className,
  content,
  heading,
  ...otherProps
}) => {
  const classNames = classnames(styles.container, className)

  return (
    <div className={classNames} {...otherProps}>
      <h3 className={styles.heading}>{heading}</h3>
      <p className={styles.content}>{content}</p>
    </div>
  )
}

export { TableCol }
