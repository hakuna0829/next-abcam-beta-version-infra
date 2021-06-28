import { createContext, useMemo } from 'react'

import type { ReactElement } from 'react'
import type { ProductContextProps } from './product.type'

export const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
)

export const ProductProvider = ({
  abbreviation,
  children,
  productCode,
  ...otherProps
}: ProductContextProps): ReactElement => {
  const value = useMemo(
    () => ({
      abbreviation,
      productCode,
    }),
    [abbreviation, productCode]
  )

  return (
    <ProductContext.Provider value={value} {...otherProps}>
      {children}
    </ProductContext.Provider>
  )
}
