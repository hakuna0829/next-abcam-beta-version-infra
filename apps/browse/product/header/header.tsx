import { Button } from '@abcam-web/lego-shared-components/lib'
import { ReactComponent as Download } from '@browse/public/icons/download.svg'
import { testTagProp } from '@browse/common/tagging'

import styles from './header.module.css'

import type { FC } from 'react'
import type { HeaderProps } from './header.props'

const Header: FC<HeaderProps> = ({ onDownload, title }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header} {...testTagProp('page-name')}>
        {title}
      </h2>
      <div className={styles.buttonContainer}>
        {!!onDownload && (
          <Button
            onClick={onDownload}
            size="medium"
            variant="tertiary"
            iconLeft={<Download />}
            {...testTagProp('download-button')}
          >
            Download
          </Button>
        )}
      </div>
    </div>
  )
}

export { Header }
