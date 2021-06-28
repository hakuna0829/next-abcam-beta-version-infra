import { useState } from 'react'

import { testTagProp } from '@browse/common/tagging'
import { P } from '@browse/components/p/p'
import { Button } from '@abcam-web/lego-shared-components/lib'
import { Modal } from '@browse/components/modal/modal'

import styles from './contact-distributor.module.css'

import type { FC } from 'react'
import type { ContactDistributorPropTypes } from './contact-distributor.types'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const ContactDistributor: FC<ContactDistributorPropTypes> = ({
  summary,
  sizes = [],
}) => {
  const iFrameSrc = `${
    publicRuntimeConfig.ELOQUA_URL ||
    'https://go.myabcam.com/distributor-enquiry-test-site'
  }?product=${encodeURIComponent(summary.name)}&code=${summary.productCode}`
  const [open, setOpen] = useState<boolean>(false)
  const onButtonClick = () => setOpen(true)
  const onClose = () => setOpen(false)

  return (
    <>
      <div>
        <div className={styles.container}>
          <P className={styles.notice}>
            If you want to place an order, please contact our distributor
          </P>
          {sizes.map((size) => (
            <div key={size.uom}>
              {size.volumeOrMass} {size.uom}
            </div>
          ))}

          <Button
            onClick={onButtonClick}
            size="large"
            variant="primary"
            {...testTagProp('contact-distributor-button')}
          >
            Contact distributor
          </Button>
        </div>

        <div className={styles.buyButtonContainer}>
          <Button
            onClick={onButtonClick}
            size="small"
            variant="primary"
            {...testTagProp('contact-distributor-button')}
          >
            Buy
          </Button>
        </div>
      </div>

      <Modal header="Make an inquiry" onClose={onClose} show={open}>
        <>
          <iframe
            height="415"
            frameBorder="0"
            src={iFrameSrc}
            title="Make an enquiry"
          />
          <div className={styles.modalFooter}>
            <span>Abcam will process your data in accordance with its</span>
            <a
              className={styles.link}
              href="https://www.abcam.com/content/privacy-policy"
              target="_blank"
              rel="noreferrer"
            >
              Privacy policy
            </a>
          </div>
        </>
      </Modal>
    </>
  )
}
