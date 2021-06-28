import classnames from 'classnames'

import styles from './table.module.css'

import type { FC } from 'react'
import type { TableProps } from './table.props'

const Table: FC<TableProps> = ({ children, className }) => {
  const classname = classnames(styles.table, className)

  return <div className={classname}>{children}</div>
}

export { Table }
