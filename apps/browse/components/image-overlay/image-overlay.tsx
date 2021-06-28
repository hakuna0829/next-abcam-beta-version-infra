import classNames from 'classnames'
import { useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import DOMPurify from 'dompurify'

import { useEnvironment } from '@browse/environment/Environment.context'
import { useWindowResize } from '@browse/window-resize/use-window-resize.hooks'
import { ReactComponent as Cross } from '@browse/public/icons/cross.svg'
import { ReactComponent as ArrowRight } from '@browse/public/icons/arrow-right.svg'
import { ReactComponent as ArrowLeft } from '@browse/public/icons/arrow-left.svg'
import { Button } from '@browse/components/button'
import { ImageSlider } from './components/image-slider/image-slider'
import { grey20, grey95 } from '@browse/public'
import { breakpoints } from '@browse/window-resize/breakpoints'
import { testTagProp } from '@browse/common/tagging'

import styles from './image-overlay.module.css'

import type { FC } from 'react'
import type { ImageOverlayPropTypes } from './image-overlay.type'

const BackToProductIcon = styled(ArrowRight)`
  path {
    fill: red;
  }
`

const Close = styled(Cross)`
  margin-left: 2rem;
  path {
    fill: white;
  }
`

const svgProps = {
  width: '16',
  height: '16',
  viewBox: '0 0 24 24',
}

const maxWidthMobile = breakpoints.small

export const ImageOverlay: FC<ImageOverlayPropTypes> = ({
  setOpen,
  open,
  imagesData,
  current,
  setCurrent,
}) => {
  const environment = useEnvironment()
  const [showAll, setShowAll] = useState<boolean>(false)
  const { width } = useWindowResize()
  const symbolsCount = 100

  const currentImage = useMemo(() => imagesData[current], [imagesData, current])

  const handleClick = () => setOpen(false)

  const showBackButton = width < maxWidthMobile && showAll

  const renderDescriptionIteratee = (description: string, key: number) => (
    <div
      className={styles.description}
      key={key}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  )

  const renderInfo = () => (
    <>
      <div
        className={styles.imageInfoTitle}
        {...testTagProp('image-info-title')}
      >
        {currentImage?.title}
      </div>
      {currentImage?.image_legend &&
        [currentImage?.image_legend].map(renderDescriptionIteratee)}
    </>
  )

  const Description = () => {
    const WholeInfo = () =>
      width < maxWidthMobile ? (
        <div className={styles.wholeInfoMobile}>{renderInfo()}</div>
      ) : (
        <div className={styles.wholeInfo}>{renderInfo()}</div>
      )
    if (width < maxWidthMobile && !showAll) {
      return (
        <div>
          <div
            className={styles.imageInfoTitle}
            {...testTagProp('image-info-title')}
          >
            {currentImage?.title}
          </div>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                `${
                  currentImage?.image_legend &&
                  currentImage?.image_legend.slice(0, symbolsCount)
                } `
              ),
            }}
          />
          <div className={styles.seeMore} onClick={() => setShowAll(true)}>
            See more
          </div>
        </div>
      )
    }

    return <WholeInfo />
  }

  const content = open && (
    <div className={styles.overlay}>
      <div className={styles.overlayButtons}>
        <Button
          variant="tertiary"
          rightIcon={<BackToProductIcon {...svgProps} />}
          size="small"
          background="dark"
          style={{
            border: '1px solid transparent',
            backgroundColor: grey95,
            color: grey20,
            marginLeft: '0.25rem',
            height: '2rem',
            paddingTop: '5px',
          }}
          fill={grey20}
          onClick={handleClick}
        >
          Full product info
        </Button>

        <Close
          onClick={handleClick}
          width="32"
          height="32"
          viewBox="0 0 24 24"
        />
      </div>

      <div className={styles.container}>
        <div className={styles.showDesktop}>
          <div className={styles.imageProfile}>
            <div className={styles.imageZoom}>
              <img
                alt={currentImage?.title}
                className={styles.image}
                src={
                  environment.IMAGES_URI +
                  '/content/dam/abcam/product/' +
                  currentImage?.image_url
                }
                title={currentImage?.title}
              />
            </div>
            <div className={styles.imageInfo}>
              <Description />
            </div>
          </div>
          <ImageSlider
            current={current}
            imagesDataOpt={imagesData}
            setCurrent={setCurrent}
            hideStore
          />
        </div>
        <div className={styles.showMobile}>
          <div className={styles.imageProfileMobile}>
            <div className={styles.imageMobileZoom}>
              <img
                alt={currentImage?.altText}
                className={classNames(styles.image, styles.imageMobile)}
                src={
                  environment.IMAGES_URI +
                  '/content/dam/abcam/product/' +
                  currentImage?.image_url
                }
              />
            </div>
            <div className={styles.imageInfoMobile}>
              {showBackButton && (
                <Button
                  variant="tertiary"
                  leftIcon={<ArrowLeft {...svgProps} />}
                  size="small"
                  background="dark"
                  onClick={() => setShowAll(false)}
                  style={{
                    border: 'none',
                    padding: 0,
                  }}
                >
                  Back
                </Button>
              )}
              <Description />
            </div>
          </div>
          <ImageSlider
            current={current}
            imagesDataOpt={imagesData}
            setCurrent={setCurrent}
            margin="24"
            hideStore
          />
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
