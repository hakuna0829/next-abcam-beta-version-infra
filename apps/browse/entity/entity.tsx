import { Fragment } from 'react'

import { Category } from '@browse/category/category'
import styles from './entity.module.css'

import type { PropTypes } from '@browse/entity/entity.type'

const Entity = ({ category, items = [] }: PropTypes) => {
  return (
    <div className={styles.container}>
      {items.length > 0 &&
        items.map((item) => {
          return (
            <Fragment key={item.title}>
              <div className={styles.description}>
                <h1 className={styles.heading}>{item.title}</h1>
                <p className={styles.synonyms}> {item.synonyms}</p>
                <p className={styles.synopsis}>{item.description.plaintext}</p>
              </div>
              <div className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src="https://publish-p24061-e70035.adobeaemcloud.com/en-gb/target/p53/_jcr_content/root/responsivegrid/responsivegrid_109234366/image.coreimg.png/1607353740490/274px-p53.png"
                  alt=""
                />
              </div>
            </Fragment>
          )
        })}
      <div className={styles.searchResults}>
        <Category category={category} />
      </div>
    </div>
  )
}

export { Entity }
