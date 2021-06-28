import type { FC } from 'react'
import styles from '@browse/error/error.module.css'
import { Container } from '@browse/components/container/container'
import { ErrorConfig } from '@browse/error/entity/entity.type'

export const Error: FC<ErrorConfig> = ({
  button,
  description,
  movedDescription,
  title,
}) => {
  return (
    <Container widthLimited>
      <div className={styles.container}>
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
          <div className={styles.movedDescription}>{movedDescription}</div>
          {button}
        </div>
      </div>
    </Container>
  )
}
