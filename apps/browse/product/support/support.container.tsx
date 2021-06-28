import { useRouter } from 'next/router'
import routerEvents from 'next-router-events'

import { routes } from '@browse/routes/routes'
import { Support } from '@browse/product/support/support'

import type { FC } from 'react'
import type { SupportContainerPropTypes } from '@browse/product/support/support.type'

export const SupportContainer: FC<SupportContainerPropTypes> = ({
  support,
}) => {
  const router = useRouter()
  const {
    query: { productCode = '' },
  } = router

  const onPrintDatasheetClick = () => {
    routerEvents.once('routeChangeComplete', () => {
      window.print()
    })
    router.push(routes.product.datasheet(productCode.toString()).as)
  }

  return (
    <Support onPrintDatasheetClick={onPrintDatasheetClick} support={support} />
  )
}
