import { testTagProp } from '@browse/common/tagging'

import styles from './table-heading.module.css'

import type { FC } from 'react'
import type { TableHeadingProps } from './table-heading.props'

const TableHeading: FC<TableHeadingProps> = ({ heading, ...otherProps }) => (
  <h2 className={styles.container} {...otherProps}>
    {heading}
  </h2>
)

export { TableHeading }
