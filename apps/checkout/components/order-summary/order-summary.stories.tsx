import React, { FC, useEffect, useState } from 'react'
import { OrderSummary, OrderSummaryProps } from './order-summary'
import styles from './order-summary.stories.module.css'
import classNames from 'classnames'

export default {
  component: OrderSummary,
  title: 'OrderSummary',
}

const OrderSummaryExample: FC = () => {
  const [isExpanded, setIsExpanded] = useState(true)
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

  const props: OrderSummaryProps = {
    itemsCount: 4,
    subtotal: { value: 1800, currency: '£' },
    vat: { value: 360, currency: '£' },
    vatPercentage: 20,
    total: { value: 2176, currency: '£' },
    isExpanded: isExpanded,
    loginOnClick: (): void => {
      console.log('Login clicked')
    },
    continueOnClick: (): void => {
      console.log('Continue clicked')
    },
    chooseCountryOnClick: (): void => {
      console.log('Choose country clicked')
    },
  }

  return (
    <>
      <div className={styles.shoppingBasket}>
        <div className={styles.content}>
          <div
            className={classNames({
              [styles.orderSummaryContainer]: isExpanded,
              [styles.orderSummaryContainerScrolled]: !isExpanded,
            })}
          >
            <OrderSummary {...props} />
          </div>
          <p style={{ height: '300vh' }} />
        </div>
      </div>
    </>
  )
}

export const primary = () => {
  return <OrderSummaryExample />
}
