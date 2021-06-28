import type { FC } from 'react'
import classnames from 'classnames'
import styles from './feedback-panel.module.css'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const FeedbackPanel: FC<{ isPanelActive?: boolean }> = ({
  isPanelActive = false,
}) => {
  const containerClassName = classnames(
    styles.container,
    styles.active,
    isPanelActive ? styles.dark : styles.light
  )

  return (
    <div className={containerClassName}>
      <span>
        Welcome to our new search BETA, some data may be incomplete. We value
        your comments, please leave&nbsp;
        <a
          href={publicRuntimeConfig.HOTJAR_SURVEY}
          target="_blank"
          rel="noreferrer"
        >
          feedback
        </a>
        . Visit&nbsp;
        <a href="https://www.abcam.com" target="_blank" rel="noreferrer">
          abcam.com
        </a>
      </span>
    </div>
  )
}
