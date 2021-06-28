import classnames from 'classnames'
import type { FC } from 'react'
import { testTagProp } from '@browse/common/tagging'
import styles from '@browse/components/footer/footer.module.css'
import type { FooterProps } from '@browse/components/footer/footer.type'

export const Footer: FC<FooterProps> = ({ isPanelActive = false }) => {
  return (
    <footer
      className={classnames(styles.container, isPanelActive && 'hidden')}
      {...testTagProp('footer-wrapper')}
    >
      <div className={styles.copyright}>
        <p>&copy; Abcam 2021</p>
      </div>
      <div className={styles.links}>
        <a
          href="https://www.abcam.com/index.html?pageconfig=contactus"
          target="_blank"
          rel="noreferrer"
        >
          Contact
        </a>

        <a
          href="https://www.abcam.com/content/privacy-policy"
          target="_blank"
          rel="noreferrer"
        >
          Privacy
        </a>

        <a
          href="https://www.abcam.com/content/abcams-terms-and-conditions"
          target="_blank"
          rel="noreferrer"
        >
          Terms &amp; Conditions
        </a>
      </div>
    </footer>
  )
}
