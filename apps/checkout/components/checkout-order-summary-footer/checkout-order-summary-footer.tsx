import { Button } from '@abcam-web/lego-shared-components/lib/button/button'
import React, { FC } from 'react'
import classnames from 'classnames'
import styles from './checkout-order-summary-footer.module.css'
import type { Price } from '@checkout-shared/types'
export interface CheckoutOrderSummaryFooterProps {
  total: Price
  isLoading?: boolean
  placeOrderOnClick: () => void
  termsAndConditionsOnClick: () => void
}

const CheckoutOrderSummaryFooter: FC<CheckoutOrderSummaryFooterProps> = ({
  total,
  isLoading,
  placeOrderOnClick,
  termsAndConditionsOnClick,
}) => {
  return (
    <div className={styles.CheckoutOrderSummaryFooter}>
      {!isLoading && (
        <div className={styles.content}>
          <div className={styles.orderTotal}>
            <div className="totalHeader">
              <p>Order total</p>
            </div>
            <div className="totalValue">
              <p>
                {total.currency}
                {total.value}
              </p>
            </div>
          </div>
          <div className={styles.placeOrder}>
            <Button
              className={styles.button}
              onClick={placeOrderOnClick}
              variant="primary"
              size="large"
            >
              Place order
            </Button>
          </div>
          <div className={styles.termsAndConditions}>
            <p>
              By placing your order, you acknowledge that you read and agreed to
              <Button
                as="a"
                className={classnames(styles.termsAndConditions, styles.button)}
                bodyClassName={classnames(
                  styles.termsAndConditions,
                  styles.link
                )}
                onClick={termsAndConditionsOnClick}
                variant="tertiary"
                size="small"
              >
                Abcam's terms and conditions
              </Button>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export { CheckoutOrderSummaryFooter }
