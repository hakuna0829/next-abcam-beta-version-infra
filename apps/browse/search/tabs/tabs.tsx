import Link from '@browse/components/link/link'
import { routes } from '@browse/routes/routes'

import styles from './tabs.module.css'

import type { FC } from 'react'
import type { TabsPropTypes } from './tabs.type'
import { testTagProp } from '@browse/common/tagging'
import classnames from 'classnames'

export const Tabs: FC<TabsPropTypes> = ({
  items = [],
  currentView,
  setCurrentView,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {items.map(({ id, label }) => {
          const route = routes.search[id]()
          if (!route) throw new Error('route does not exist')

          return (
            <div
              className={classnames(
                styles.link,
                currentView === id && styles.linkActive
              )}
              key={label}
              {...testTagProp(`${id}` as const)}
              onClick={() => {
                setCurrentView(id)
              }}
            >
              {label}
            </div>
          )
        })}
      </div>
    </div>
  )
}
