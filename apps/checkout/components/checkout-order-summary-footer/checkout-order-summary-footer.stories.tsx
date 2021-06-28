import React, { FC } from 'react'
import {
  CheckoutOrderSummaryFooter,
  CheckoutOrderSummaryFooterProps,
} from './checkout-order-summary-footer'
import styles from './checkout-order-summary-footer.stories.module.css'

export default {
  component: CheckoutOrderSummaryFooter,
  title: 'CheckoutOrderSummaryFooter',
}

const CheckoutOrderSummaryFooterExample: FC = () => {
  const props: CheckoutOrderSummaryFooterProps = {
    total: { value: 723.2, currency: '£' },
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
              <CheckoutOrderSummaryFooter {...props} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const primary = () => {
  return <CheckoutOrderSummaryFooterExample />
}
