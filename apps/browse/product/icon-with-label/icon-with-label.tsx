import classnames from 'classnames'

import styles from './icon-with-label.module.css'

import type { ReactNode } from 'react'

type GreenLabelCheckProps = {
  title: string
  className?: string
  icon: ReactNode
  dataCy?: string
}

export const IconWithLabel: React.FC<GreenLabelCheckProps> = (props) => {
  const wrapperClassNames = classnames(styles.wrapper, props.className)

  return (
    <div className={wrapperClassNames}>
      <div className={styles.icon}>{props.icon}</div>
      <span className={styles.label} data-cy={props.dataCy}>
        {props.title}
      </span>
    </div>
  )
}

export default IconWithLabel
