import { Button, Select } from '@abcam-web/lego-shared-components/lib'
import React, { FC } from 'react'
import { useEffect, useState } from 'react'
import { SizesBox } from '../sizes-box/sizes-box'
import { Size, Product } from '../../types'

import styles from './buy-box.module.css'
import cx from 'classnames'
import { DropdownOption } from '@abcam-web/lego-shared-components/lib/dropdown/dropdown.type'

export interface BuyBoxProps {
  customerType?: 'user' | 'distributor' | 'institution'
  product: Product
  onChangeCountry?: () => void
  country?: string
}

const BuyBox: FC<BuyBoxProps> = ({
  customerType,
  product = { abId: '' },
  onChangeCountry = (): null => null,
  country = 'United Kingdom',
}) => {
  const { sizes, restriction } = product

  const [selectedSize, setSelectedSize] = useState<Size | undefined>(
    sizes ? sizes.find((size) => size.default) || sizes[0] : undefined
  )

  useEffect(() => {
    if (sizes && sizes.length > 0) {
      const defaultSize = sizes.find((size) => size.default) || sizes[0]
      setSelectedSize(defaultSize)
    }
  }, [sizes])

  const stockQuantityOptions: DropdownOption[] = [
    ...new Array(selectedSize?.maxQuantity),
  ].map((item, index) => ({
    displayValue: (index + 1).toString(),
    key: (index + 1).toString(),
  }))

  return (
    <div
      className={cx({
        [styles.BuyBox]: true,
        [styles.restricted]: !!restriction,
      })}
    >
      {restriction && (
        <div className={styles.restrictionContainer}>
          <div className={styles.title}>{restriction?.title}</div>
          <div className={styles.message}>{restriction?.message}</div>
        </div>
      )}
      {sizes && selectedSize && (
        <div>
          <SizesBox
            selectedSize={selectedSize}
            sizes={sizes}
            onChange={(selected) => {
              setSelectedSize(selected)
            }}
          />
          <div className={styles.priceContainer}>
            {selectedSize?.price?.currency}
            {selectedSize?.price?.value}
            <div className={styles.message}>All prices exclude sales tax.</div>
          </div>
          <div className={styles.quantityContainer}>
            <div>Quantity:</div>
            <Select
              options={stockQuantityOptions}
              onChange={(): null => null}
            />
            <div className={cx(styles.message, styles.green)}>
              {selectedSize.maxQuantity}+ in stock
            </div>
            <div className={styles.message}>
              <div>Estimated delivery Tomorrow</div>
              <div>If you order before 2:00PM</div>
            </div>
          </div>
          <Button className={styles.addButton} variant="primary">
            Add to basket
          </Button>
        </div>
      )}

      <div
        className={cx({
          [styles.shippingContainer]: true,
          [styles.restricted]: restriction,
        })}
      >
        <div
          className={cx({
            [styles.message]: true,
            [styles.restricted]: restriction,
          })}
        >
          Shipping to {country}
        </div>
        <div>
          <Button
            className={cx({
              [styles.countrySelector]: true,
              [styles.restricted]: restriction,
            })}
            onClick={onChangeCountry}
            variant="tertiary"
            size="large"
          >
            Change
          </Button>
        </div>
      </div>
    </div>
  )
}

export { BuyBox }
