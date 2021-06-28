import Link from '@browse/components/link/link'
import { routes } from '@browse/routes/routes'
import { Tag, testTagProp } from '@browse/common/tagging'

import styles from './tabs.module.css'

import type { FC } from 'react'
import type { TabsPropTypes } from './tabs.type'

export const Tabs: FC<TabsPropTypes> = ({ items = [], productCode }) => {
  return (
    <div className={styles.container}>
      {items.map(({ id, label, isActive }) => {
        const route = routes.product[id](productCode)
        if (!route) throw new Error('route does not exist')

        return (
          <Link
            activeClassName={styles.linkActive}
            className={styles.link}
            isActive={isActive}
            key={label}
            to={route}
            {...testTagProp(`${id}-tab` as const)}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}
