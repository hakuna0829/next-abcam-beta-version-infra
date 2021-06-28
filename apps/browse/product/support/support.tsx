import classnames from 'classnames'

import { testTagProp } from '@browse/common/tagging'
import { P } from '@browse/components/p/p'
import { PrintDatasheet } from '@browse/product/support/print-datasheet/print-datasheet'
import { Hr } from '@browse/components/hr/hr'
import { Button } from '@abcam-web/lego-shared-components/lib'

import { ReactComponent as Magnifier } from '@browse/public/icons/magnifier.svg'

import styles from './support.module.css'

import type { FC } from 'react'
import type { SupportPropTypes } from '@browse/product/support/support.type'

export const Support: FC<SupportPropTypes> = ({
  onPrintDatasheetClick,
  support,
}) => {
  const headingClassName = classnames(styles.heading)
  console.log('support.howToStore...', support.howToStore)

  return (
    <>
      <Hr />
      <h2 className={headingClassName}>Prints</h2>
      <PrintDatasheet onClick={onPrintDatasheetClick} />
      <h2 className={headingClassName} {...testTagProp('protocols-title')}>
        Protocols
      </h2>
      <div {...testTagProp('protocols-description')}>
        <P>
          To our knowledge, no specific protocols are required for this product.
          Check the{' '}
          <a
            className="text-blue"
            href="https://www.abcam.com/index.html?pageconfig=popular_protocols"
            rel="noreferrer"
            target="_blank"
          >
            general protocols
          </a>
        </P>
      </div>

      <h2 className={headingClassName}>Get help with this product</h2>
      <div className={styles.buttonContainer}>
        <Button
          as="a"
          className={styles.button}
          href="https://www.abcam.com/support?kbpath=/69/external/"
          openInNewWindow
          size="medium"
          variant="primary"
          iconLeft={<Magnifier />}
          {...testTagProp('search-button')}
        >
          Search support hub
        </Button>
      </div>
    </>
  )
}
