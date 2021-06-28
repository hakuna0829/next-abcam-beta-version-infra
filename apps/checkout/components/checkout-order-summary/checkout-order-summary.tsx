import { Button } from '@abcam-web/lego-shared-components/lib/button/button'
import React, { FC } from 'react'
import classnames from 'classnames'
import styles from './checkout-order-summary.module.css'
import type { Price } from '@checkout-shared/types'
export interface CheckoutOrderSummaryProps {
  items: Price
  shippingAndHandling: Price
  vat: Price
  vatPercentage: number
  total: Price
  discounts: Price
  discountsPercentage: number
  isLoading?: boolean
  placeOrderOnClick: () => void
  termsAndConditionsOnClick: () => void
}

const CheckoutOrderSummary: FC<CheckoutOrderSummaryProps> = ({
  items,
  shippingAndHandling,
  vat,
  vatPercentage,
  total,
  discounts,
  discountsPercentage,
  isLoading,
  placeOrderOnClick,
  termsAndConditionsOnClick,
}) => {
  return (
    <div className={styles.CheckoutOrderSummary}>
      {!isLoading && (
        <>
          <div className={styles.contentHeader}>
            <div className={styles.termsAndConditions}>
              <p>
                By placing your order, you acknowledge that you read and agreed
                to
                <Button
                  as="a"
                  className={classnames(
                    styles.termsAndConditions,
                    styles.button
                  )}
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
          </div>
          <div className={styles.contentBody}>
            <div className={styles.orderSummary}>Order Summary</div>
            <div>
              <hr className={styles.upperLine} />
            </div>
            <div className={classnames(styles.checkoutInfo, styles.items)}>
              <div className="itemsHeader">
                <p>Items</p>
              </div>
              <div className="itemsValue">
                <p>
                  {items.currency}
                  {items.value}
                </p>
              </div>
            </div>
            <div
              className={classnames(
                styles.checkoutInfo,
                styles.shippingAndHandling
              )}
            >
              <div className="shippingAndHandlingHeader">
                <p>Shipping &amp; handling</p>
              </div>
              <div className="shippingAndHandlingValue">
                <p>
                  {shippingAndHandling.currency}
                  {shippingAndHandling.value}
                </p>
              </div>
            </div>
            <div className={classnames(styles.checkoutInfo, styles.tax)}>
              <div className="taxHeader">
                <p>VAT ({vatPercentage}%)</p>
              </div>
              <div className="taxValue">
                <p>
                  {vat.currency}
                  {vat.value}
                </p>
              </div>
            </div>
            <div>
              <hr className={styles.lowerLine} />
            </div>
            <div className={classnames(styles.checkoutInfo, styles.orderTotal)}>
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
            <div className={classnames(styles.checkoutInfo, styles.discounts)}>
              <div className="discountHeader">
                <p>Applied discounts ({discountsPercentage}%)</p>
              </div>
              <div className="discountValue">
                <p>
                  {discounts.currency}
                  {discounts.value}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export { CheckoutOrderSummary }
