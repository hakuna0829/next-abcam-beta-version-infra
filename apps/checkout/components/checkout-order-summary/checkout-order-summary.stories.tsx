import React, { FC } from 'react'
import {
  CheckoutOrderSummary,
  CheckoutOrderSummaryProps,
} from './checkout-order-summary'
import styles from './checkout-order-summary.stories.module.css'

export default {
  component: CheckoutOrderSummary,
  title: 'CheckoutOrderSummary',
}

const CheckoutOrderSummaryExample: FC = () => {
  const props: CheckoutOrderSummaryProps = {
    items: { value: 1400, currency: '£' },
    shippingAndHandling: { value: 16, currency: '£' },
    vat: { value: 123.24, currency: '£' },
    vatPercentage: 20,
    total: { value: 723.2, currency: '£' },
    discounts: { value: 200, currency: '£' },
    discountsPercentage: 25,
    placeOrderOnClick: (): void => {
      console.log('Place order clicked')
    },
    termsAndConditionsOnClick: (): void => {
      console.log('Terms and condition clicked')
    },
  }

  return (
    <>
      <div className={styles.page}>
        <div className={styles.checkout}>
          <div className={styles.content}>
            <div className={styles.checkoutOrderSummaryContainer}>
              <CheckoutOrderSummary {...props} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const primary = () => {
  return <CheckoutOrderSummaryExample />
}
