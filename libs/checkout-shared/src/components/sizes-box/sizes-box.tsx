import React, { FC } from 'react'
import classNames from 'classnames'
import { Button } from '@abcam-web/lego-shared-components/lib'
import { Before } from '@abcam-web/lego-shared-components/icons'
import { Size } from '../../types'

import styles from './sizes-box.module.css'

interface SizeButtonProps {
  value: Size
  selected?: boolean
  onClick: (item: Size) => void
  className?: string
}
interface SizesBoxProps {
  sizes: Size[]
  selectedSize: Size
  onChange?: (selectedSizeItem: Size) => void
}

const SizeButton: FC<SizeButtonProps> = ({
  value,
  selected,
  onClick,
  className,
}) => {
  return (
    <div className={`SizeButton${className && ` ${className}`}`}>
      <Button
        className={classNames({
          'whitespace-nowrap': true,
          [styles.regularRutton]: !selected,
          [styles.selectedButton]: selected,
        })}
        onClick={(): void => {
          onClick(value)
        }}
        size="medium"
        variant="tertiary"
      >
        <div className={styles.content}>
          {selected && <Before className={styles.ico} />}
          {value.value} {value.unit}
        </div>
      </Button>
    </div>
  )
}

const SizesBox: FC<SizesBoxProps> = ({
  sizes,
  onChange = (): null => null,
  selectedSize,
}) => {
  return (
    <div className={styles.SizesBox}>
      <div className={styles.message}>Select the product size:</div>
      {sizes.length > 1 && (
        <div className={styles.sizeList}>
          {sizes.map((size, index) => (
            <SizeButton
              key={index}
              onClick={(selected): void => {
                onChange(selected)
              }}
              value={size}
              selected={selectedSize === size}
            />
          ))}
        </div>
      )}
      {sizes.length === 1 && (
        <div className={styles.singleSize}>
          {sizes[0].value}
          {sizes[0].unit}
        </div>
      )}
    </div>
  )
}

export { SizesBox }
