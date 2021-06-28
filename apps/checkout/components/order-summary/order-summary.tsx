import { Button } from '@abcam-web/lego-shared-components/lib/button/button'
import React, { FC } from 'react'
import classNames from 'classnames'

import styles from './order-summary.module.css'
import type { Price } from '@checkout-shared/types'
export interface OrderSummaryProps {
  itemsCount: number
  subtotal: Price
  vat: Price
  vatPercentage: number
  total: Price
  isLoading?: boolean
  isExpanded: boolean
  loginOnClick: () => void
  continueOnClick: () => void
  chooseCountryOnClick: () => void
}

const OrderSummary: FC<OrderSummaryProps> = ({
  itemsCount,
  subtotal,
  vat,
  vatPercentage,
  total,
  isExpanded,
  isLoading,
  loginOnClick,
  continueOnClick,
  chooseCountryOnClick,
}) => {
  return (
    <div className={styles.OrderSummary}>
      {!isLoading && (
        <div
          className={classNames({
            [styles.content]: isExpanded,
            [styles.contentFolded]: !isExpanded,
          })}
        >
          <div
            className={classNames({
              [styles.subTotal]: isExpanded,
              [styles.subTotalFolded]: !isExpanded,
            })}
          >
            <div
              className={classNames({
                [styles.subTotalHeader]: isExpanded,
                [styles.subTotalHeaderFolded]: !isExpanded,
              })}
            >
              <p>Subtotal ({itemsCount} items)</p>
            </div>
            <div
              className={classNames({
                [styles.subTotalValue]: isExpanded,
                [styles.subTotalValueFolded]: !isExpanded,
              })}
            >
              <p>
                {subtotal.currency}
                {subtotal.value}
              </p>
            </div>
          </div>
          <div
            className={classNames({
              [styles.shippingAndHandling]: isExpanded,
              [styles.shippingAndHandlingFolded]: !isExpanded,
            })}
          >
            <div className={styles.shippingAndHandlingHeader}>
              <p>Shipping &amp; handling</p>
            </div>
            <div className={styles.shippingAndHandlingValue}>
              <Button
                as="a"
                className={classNames(
                  'whitespace-nowrap',
                  styles.countrySelector
                )}
                onClick={chooseCountryOnClick}
                variant="primary"
                size="small"
              >
                Choose your country to estimate
              </Button>
            </div>
          </div>
          <div
            className={classNames({
              [styles.tax]: isExpanded,
              [styles.taxFolded]: !isExpanded,
            })}
          >
            <div className={styles.taxHeader}>
              <p>VAT ({vatPercentage}%)</p>
            </div>
            <div className={styles.taxValue}>
              <p>
                {vat.currency}
                {vat.value}
              </p>
            </div>
          </div>
          <div>
            <hr
              className={classNames({
                [styles.middleLine]: isExpanded,
                [styles.middleLineFolded]: !isExpanded,
              })}
            />
          </div>
          <div
            className={classNames({
              [styles.total]: isExpanded,
              [styles.totalFolded]: !isExpanded,
            })}
          >
            <div className={styles.totalHeader}>
              <p>Order total</p>
            </div>
            <div className={styles.totalValue}>
              <p>
                {total.currency}
                {total.value}
              </p>
            </div>
          </div>
          <div
            className={classNames({
              [styles.buttons]: isExpanded,
              [styles.buttonsFolded]: !isExpanded,
            })}
          >
            <Button
              className={classNames({
                'whitespace-nowrap': true,
                [styles.loginButton]: isExpanded,
                [styles.loginButtonFolded]: !isExpanded,
              })}
              onClick={loginOnClick}
              variant="primary"
              size="large"
            >
              Login to checkout
            </Button>
            <Button
              className={classNames({
                'whitespace-nowrap': true,
                [styles.continueButton]: isExpanded,
                [styles.continueButtonFolded]: !isExpanded,
              })}
              onClick={continueOnClick}
              variant="tertiary"
              size="large"
            >
              Continue browsing
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export { OrderSummary }
