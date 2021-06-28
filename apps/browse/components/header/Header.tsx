import Link from 'next/link'

import type { FC } from 'react'

import styles from './header.module.css'

export const Header: FC = () => {
  return (
    <header className={styles.container}>
      <Link href="/">
        <h1 className="cursor-pointer">
          abcam <small>beta</small>
        </h1>
      </Link>
    </header>
  )
}
