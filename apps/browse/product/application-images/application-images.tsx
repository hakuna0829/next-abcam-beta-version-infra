import { useState } from 'react'

import { useEnvironment } from '@browse/environment/Environment.context'
import { ImageOverlay } from '@browse/components/image-overlay/image-overlay'
import { testTagProp } from '@browse/common/tagging'

import styles from './application-images.module.css'

import type { FC } from 'react'
import type { ApplicationImagesProps } from './application-images.type'

export const ApplicationImages: FC<ApplicationImagesProps> = ({
  imagesData,
  isOverlayOpen,
  overlayClick,
}) => {
  const environment = useEnvironment()
  const [current, setCurrent] = useState(0)
  return (
    <div className={styles.container}>
      {imagesData.slice(0, 3).map(({ image_url: url, title }, key) => (
        <div className={styles.imageWrapper} key={key}>
          <img
            alt={title}
            className={styles.image}
            key={key}
            onClick={() => {
              overlayClick(!isOverlayOpen)
              setCurrent(key)
            }}
            src={`${environment.IMAGES_URI}/content/dam/abcam/product/${url}`}
            title={title}
            {...testTagProp('slider-image')}
          />
        </div>
      ))}

      <ImageOverlay
        current={current}
        imagesData={imagesData}
        open={isOverlayOpen}
        setCurrent={setCurrent}
        setOpen={overlayClick}
      />
    </div>
  )
}
