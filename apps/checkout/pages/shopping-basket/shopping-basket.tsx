import React, { FC } from 'react'
import { useEffect, useState } from 'react'
import styles from './shopping-basket.module.css'
import { ArrowLeft } from '@abcam-web/lego-shared-components/icons'
import {
  OrderSummary,
  OrderSummaryProps,
} from '../../components/order-summary/order-summary'
import {
  BasketItemList,
  BasketItemListProps,
} from '../../components/basket-item-list/basket-item-list'
import {
  ShoppingBasket,
  defaultShoppingBasket,
} from '../../entity/basket-item.type'
import { ShoppingBasketMock } from '../../mocks/data/shopping-basket'
import classNames from 'classnames'

const ShoppingBasketPage: FC = () => {
  const [data, setData] = useState<ShoppingBasket>(defaultShoppingBasket)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isExpanded, setIsExpanded] = useState(true)

  useEffect(() => {
    function getData() {
      setIsLoading(true)
      setIsLoading(false)
      setData(ShoppingBasketMock as ShoppingBasket)
    }
    getData()
  }, [])

  const {
    items,
    subtotal,
    vat: { value: vatValue, percentage: vatPercentage },
    orderTotal,
  } = data

  const orderSummaryProps: OrderSummaryProps = {
    itemsCount: items?.length,
    subtotal,
    vat: vatValue,
    vatPercentage,
    isExpanded,
    total: orderTotal,
    loginOnClick: (): void => {
      console.log('Login clicked')
    },
    continueOnClick: (): void => {
      console.log('Continue clicked')
    },
    chooseCountryOnClick: (): void => {
      console.log('Choose country clicked')
    },
    isLoading,
  }

  const basketItemProps: BasketItemListProps = {
    deleteOnClick: (): void => {
      console.log('deleteOnClick')
    },
    sizeOnChange: (): void => {
      console.log('sizeOnChange')
    },
    quantityOnChange: (): void => {
      console.log('quantityOnChange')
    },
    backURL: 'something',
    isLoading,
    items: items,
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onscroll = () => {
        const currentScrollPos = window.pageYOffset
        if (currentScrollPos > 0) {
          setIsExpanded(false)
        } else {
          setIsExpanded(true)
        }
      }
    }
  }, [])

  return (
    <div className={styles.shoppingBasket}>
      <div className={styles.header}>
        <div className={styles.backButton}>
          <ArrowLeft className={styles.ico} /> Back
        </div>
        <div className={styles.title}>Shopping Basket</div>
      </div>
      <div className={styles.content}>
        <div
          className={classNames({
            [styles.itemsContainer]: isExpanded,
            [styles.itemsContainerScrolled]: !isExpanded,
          })}
        >
          <BasketItemList {...basketItemProps} />
        </div>
        <div
          className={classNames({
            [styles.orderSummaryContainer]: isExpanded,
            [styles.orderSummaryContainerScrolled]: !isExpanded,
          })}
        >
          <OrderSummary {...orderSummaryProps} />
        </div>
      </div>
    </div>
  )
}

export default ShoppingBasketPage
