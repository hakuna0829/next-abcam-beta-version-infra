import { useEffect, useState } from 'react'

import { useProduct } from '@browse/product/product.hook'
import { tabs } from '@browse/product/tabs/items'

import { TabsWrapper } from './tabs-wrapper'

import type { FC } from 'react'

export const TabsWrapperContainer: FC = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false)
  const { abbreviation, productCode } = useProduct()
  const withActiveTabs = [...tabs]
  withActiveTabs[0].isActive = !!abbreviation

  useEffect(() => {
    const header = document.getElementById('header-container')
    const headerOffsetTop = header ? header.offsetTop : 0
    const onScroll = () => {
      setIsSticky(window.pageYOffset > headerOffsetTop)
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <TabsWrapper isSticky={isSticky} productCode={productCode} tabs={tabs} />
  )
}
