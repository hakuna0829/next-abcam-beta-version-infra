import { useContext } from 'react'
import { ProductContext } from './product.context'

import type { ProductContextProps } from './product.type'

export function useProduct(): ProductContextProps {
  const value = useContext(ProductContext)
  if (value === undefined) throw new Error('no value provided')
  return value
}
