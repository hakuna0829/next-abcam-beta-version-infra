import classNames from 'classnames'

import { CopyWrapper } from '@browse/components/copy-wrapper/copy-wrapper'
import { Tabs } from '@browse/product/tabs/tabs'
import { testTagProp } from '@browse/common/tagging'

import styles from './tabs-wrapper.module.css'

import type { FC } from 'react'
import type { TabsWrapperPropTypes } from './tabs-wrapper.type'

export const TabsWrapper: FC<TabsWrapperPropTypes> = ({
  isSticky,
  productCode,
  tabs,
}) => {
  const wrapperClassName = classNames(
    styles.wrapper,
    isSticky && styles.isSticky
  )

  return (
    <div className={wrapperClassName}>
      <Tabs items={tabs} productCode={productCode} />
      <div className={styles.productCode}>
        <CopyWrapper copyValue={productCode}>
          <div className={styles.svgContainer}>
            <svg width="24" height="24">
              <path d="M11.083 9.739h1.814v13.19h-1.814z"></path>
              <path d="M12.954 10.327l-1.283 1.283-9.326-9.327L3.627 1z"></path>
              <path d="M12.363 11.61l-1.282-1.282 9.326-9.327 1.283 1.283zM17.111 11.315l-1.283-1.283 6.89-6.889L24 4.426zM0 4.426l1.283-1.283 6.889 6.89-1.283 1.282z"></path>
            </svg>
          </div>
          <span {...testTagProp('product-code')}>{productCode}</span>
        </CopyWrapper>
      </div>
    </div>
  )
}
