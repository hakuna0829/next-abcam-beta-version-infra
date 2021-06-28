import React from 'react'
import { Button } from '@browse/components/button'
import { Text } from '@browse/components/text'
import { ReactComponent as SpeechBubbleIcon } from '@browse/public/icons/speech-bubble.svg'
import styles from '@browse/search/about-disclaimer/about-disclaimer.module.css'
import { grey60 } from '@browse/public'
import { testTagProp } from '@browse/common/tagging'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const AboutDisclaimer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Text
          {...testTagProp('welcome-abcam-title')}
          size="large"
          color={grey60}
        >
          Welcome to Abcam BETA
        </Text>
        <div className={styles.message}>
          <p>
            The team want to help you reach your research goals as fast as
            possible.
          </p>
          <p {...testTagProp('welcome-description')}>
            We’ve redesigned our product search, giving you a new way to
            discover the most effective products.
          </p>
        </div>

        <a
          href={publicRuntimeConfig.HOTJAR_SURVEY}
          target="_blank"
          rel="noreferrer"
        >
          <Button
            {...testTagProp('feedback-button')}
            variant="primary"
            size="large"
            leftIcon={<SpeechBubbleIcon />}
          >
            Give Feedback
          </Button>
        </a>

        <span className={styles.linkWrapper}>
          or{' '}
          <a
            className={styles.link}
            href="https://www.abcam.com"
            target="_blank"
            {...testTagProp('go-back-button')}
            rel="noreferrer"
          >
            go back to the old site
          </a>
        </span>
      </div>
    </div>
  )
}
