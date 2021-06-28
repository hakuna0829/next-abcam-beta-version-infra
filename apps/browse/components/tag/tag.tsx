import cn from 'classnames'

import type { FC } from 'react'

import styles from './tag.module.css'

type TagProps = {
  className?: string
  count: number
  name: string
}

const Tag: FC<TagProps> = ({ className, count, name }) => {
  const htmlClassName = cn(styles.container, className)
  return (
    <div className={htmlClassName}>
      <span className={styles.name}>{name}</span>
      <span className={styles.count}>{count}</span>
    </div>
  )
}

export { Tag }
