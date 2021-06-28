import { gql } from '@apollo/client'
import { Product } from '../types'
import { client } from './apollo'

// abId: "restricted" 'for restrictions

const GET_PRODUCT_PRICE_DETAIL = gql`
  query {
    product(abId: "123", country: "UK", controlPoint: "browse") {
      abId
      sizes {
        value
        unit
        default
        maxQuantity
        price {
          value
          currency
        }
      }
      restriction
    }
  }
`

const getProdutPricecDetails = async (): Promise<Product> => {
  try {
    const {
      data: { product },
    } = await client.query({
      query: GET_PRODUCT_PRICE_DETAIL,
    })
    return product
  } catch (err) {
    console.error(err)
    return err
  }
}

export { getProdutPricecDetails, Product }
