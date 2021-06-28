import { Button } from '@abcam-web/lego-shared-components/lib'

import styles from './body.module.css'

import type { FC } from 'react'
import type { FacetCategories } from '@browse/search/search.type'
import type { BodyPropTypes } from './body.type'

const splitCamelCase = (camelCaseString: string) => {
  const regEx = /([a-z])([A-Z])/g
  return camelCaseString.replace(regEx, '$1 $2')
}

const Body: FC<BodyPropTypes> = ({ facetCategories = [] }) => {
  return (
    <>
      {facetCategories.map((category: FacetCategories) => (
        <p className={styles.facetCategory} key={category.type}>
          {splitCamelCase(category.type)}
          {(category.values ?? []).map((subCategory) => (
            <Button
              onClick={() => console.log('view all')}
              size="medium"
              variant="quaternary"
              key={subCategory.label}
            >
              {subCategory.label}
              <span className={styles.btnCount}>{subCategory.value}</span>
            </Button>
          ))}
        </p>
      ))}
    </>
  )
}

export { Body }
