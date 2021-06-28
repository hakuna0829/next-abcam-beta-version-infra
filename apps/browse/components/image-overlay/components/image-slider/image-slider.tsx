import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import { Button } from '@abcam-web/lego-shared-components/lib/button/button'
import { ReactComponent as ChevronRight } from '@browse/public/icons/chevron-right.svg'
import { ReactComponent as ChevronLeft } from '@browse/public/icons/chevron-left.svg'

import { ProductDropdowns } from '@browse/components/product-dropdowns/product-dropdowns'
import { ImageOverlay } from '@browse/components/image-overlay/image-overlay'
import { useEnvironment } from '@browse/environment/Environment.context'
import { testTagProp } from '@browse/common/tagging'

import type { FC } from 'react'
import type {
  ImageSliderProps,
  SliderImagesContainerProps,
} from './image-slider.type'

import styles from './image-slider.module.css'
import { Picture } from '@abcam-web/lego-shared-components/icons'

const defaultImageWidth = 124
const imageMargin = 10
const defaultImageHeight = 124
const sliderMargin = 90

const SliderImagesContainer = styled.div<SliderImagesContainerProps>`
  display: flex;
  width: 100%;
  margin-top: 10px;
  transform: translateX(
    ${(props) => -(props.imageWidth + imageMargin) * props.current}px
  );

  transition: 1s;
`

export const ImageSlider: FC<ImageSliderProps> = ({
  imagesDataOpt,
  setCurrent,
  hideOverlay = true,
  current = 0,
  imageWidth = defaultImageWidth,
  imageHeight = defaultImageHeight,
}) => {
  const environment = useEnvironment()
  const [index, setIndex] = useState(0)
  const ref = useRef<HTMLInputElement>(null)

  const fullImageSize = imageWidth + imageMargin
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)

  const sliderWidth = useMemo(
    () => imagesDataOpt?.length * fullImageSize + sliderMargin * 2,
    [imagesDataOpt, fullImageSize]
  )
  useEffect(() => {
    if (typeof ref?.current?.offsetWidth === 'number')
      setContainerWidth(ref.current.offsetWidth)
  }, [])

  const showSliderNavigation = useMemo(() => {
    return containerWidth < fullImageSize * imagesDataOpt.length
  }, [containerWidth, fullImageSize, imagesDataOpt.length])

  const slideRight = () => {
    if (sliderWidth - fullImageSize * (index + 1) > containerWidth) {
      setIndex((index + 1) % imagesDataOpt.length)
    }
  }

  const slideLeft = () => {
    const nextIndex = index - 1
    if (nextIndex >= 0) {
      setIndex(nextIndex)
    }
  }

  const leftButtonDisabled = useMemo(() => index === 0, [index])
  const rightButtonDisabled = useMemo(
    () => sliderWidth - fullImageSize * (index + 1) < containerWidth,
    [sliderWidth, fullImageSize, index, containerWidth]
  )

  return (
    <div className={styles.slider} ref={ref}>
      <div className={styles.sliderHeader}>
        <ProductDropdowns />
        {showSliderNavigation && (
          <div className={styles.sliderNav}>
            <Button
              as="button"
              variant="tertiary"
              size="small"
              iconButton
              disabled={leftButtonDisabled}
              onClick={slideLeft}
            >
              <ChevronLeft />
            </Button>
            <Button
              as="button"
              variant="tertiary"
              size="small"
              iconButton
              disabled={rightButtonDisabled}
              onClick={slideRight}
            >
              <ChevronRight />
            </Button>
          </div>
        )}
      </div>

      {imagesDataOpt.length > 0 && (
        <div className={styles.sliderImageWrapper}>
          <SliderImagesContainer
            marginLeft={fullImageSize * index}
            current={index}
            imageWidth={imageWidth}
          >
            {imagesDataOpt.map(({ altText, image_url: url, title }, index) => (
              <div
                className={styles.imageWrapper}
                key={`${altText}_${index}`}
                style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}
              >
                <img
                  alt={altText}
                  className={styles.sliderImage}
                  height={imageHeight}
                  onClick={() => {
                    if (!hideOverlay) setIsOverlayOpen(true)
                    setCurrent(index)
                  }}
                  src={
                    environment.IMAGES_URI + '/content/dam/abcam/product/' + url
                  }
                  title={title}
                  width={imageWidth}
                  {...testTagProp('slider-image')}
                />
              </div>
            ))}
          </SliderImagesContainer>
          {!hideOverlay && (
            <ImageOverlay
              current={current}
              open={isOverlayOpen}
              imagesData={imagesDataOpt}
              setCurrent={setCurrent}
              setOpen={setIsOverlayOpen}
            />
          )}
        </div>
      )}
    </div>
  )
}
