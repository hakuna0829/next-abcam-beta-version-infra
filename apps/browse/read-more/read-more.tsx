import React from 'react'
import styles from './read-more.module.css'
import { testTagProp } from '@browse/common/tagging'
import type { ReadMorePropTypes } from './read-more.type'

export const ReadMore: React.FC<ReadMorePropTypes> = ({
  symbolsCount,
  text,
}) => {
  const [showAll, setShowAll] = React.useState<boolean>(false)

  if (text?.length <= symbolsCount)
    return <div className={styles.synopsis}>{text}</div>

  if (showAll)
    return (
      <div className={styles.synopsis}>
        {text} <a onClick={() => setShowAll(false)}>less</a>
      </div>
    )

  return (
    <div className={styles.wrapper}>
      {text?.slice(0, symbolsCount)}{' '}
      <a
        className={styles.text}
        {...testTagProp('read-more')}
        onClick={() => setShowAll(true)}
      >
        more
      </a>
    </div>
  )
}
