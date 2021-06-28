import { Button } from '@abcam-web/lego-shared-components/lib'

import styles from './header.module.css'

import type { FC } from 'react'
import type { HeaderPropTypes } from './header.type'
import { testTagProp } from '@browse/common/tagging'

const Header: FC<HeaderPropTypes> = ({
  categoryCount,
  categoryType,
  productCount,
}) => {
  return (
    <>
      <p className={styles.subHeading}>All Products</p>
      <p className={styles.categoryCount}>
        We found{' '}
        <span
          className={styles.categoryHighlight}
          {...testTagProp('product-count')}
        >
          {productCount} products
        </span>{' '}
        in{' '}
        <span
          className={styles.categoryHighlight}
          {...testTagProp('product-count')}
        >
          {categoryCount} category
        </span>
      </p>
      <p className={styles.totalCount}>
        <span className={styles.antibodyType}>{categoryType}</span>
        <Button
          className={styles.btnView}
          onClick={() => console.log(productCount)}
          size="medium"
          variant="primary"
        >
          View All{' '}
          <span className={styles.btnCount} {...testTagProp('view-all')}>
            {productCount}
          </span>
        </Button>
      </p>
    </>
  )
}

export { Header }
