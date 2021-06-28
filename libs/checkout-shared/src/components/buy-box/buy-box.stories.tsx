import React, { useEffect, useState, FC } from 'react'
import { BuyBox, BuyBoxProps } from './buy-box'
import { Product, getProdutPricecDetails } from '../../utils'

export default {
  component: BuyBox,
  title: 'BuyBox',
}

const mockWithOneSize: Product = {
  abId: '123',
  sizes: [
    {
      value: 500,
      unit: 'µg',
      default: true,
      price: {
        value: 700,
        currency: '€',
      },
      maxQuantity: 10,
    },
  ],
}

const mockWithSizes: Product = {
  abId: '123',
  sizes: [
    {
      value: 500,
      unit: 'µg',
      default: true,
      price: {
        value: 700,
        currency: '€',
      },
      maxQuantity: 10,
    },
    {
      value: 1000,
      unit: 'µg',
      price: {
        value: 1200,
        currency: '€',
      },
      maxQuantity: 5,
    },
  ],
}

export const BuyBoxExampleWithFetch: FC = () => {
  // Code for fetching data when api will be working
  // const [productDetails, setProductDetails] = useState<Product>()
  // const [isLoading, setIsLoading] = useState<boolean>(false)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true)
  //     const data = await getProdutPricecDetails()
  //     setIsLoading(false)
  //     setProductDetails(data)
  //   }
  //   fetchData()
  // }, [])

  return (
    <>
      <BuyBox
        product={mockWithSizes}
        onChangeCountry={(): void => {
          console.log('Change country clicked')
        }}
      />
    </>
  )
}

export const BuyBoxExampleOneSize: FC = () => {
  const props: BuyBoxProps = {
    product: mockWithOneSize,
    onChangeCountry: (): void => {
      console.log('Change country clicked')
    },
  }
  return (
    <>
      <BuyBox {...props} />
    </>
  )
}

export const BuyBoxRestricted: FC = () => {
  const props: BuyBoxProps = {
    product: {
      abId: 'test',
      restriction: {
        title: 'Currently unavailable',
        message:
          "We're sorry, but this product is not available to customers in this country/region.",
      },
    },
    onChangeCountry: (): void => {
      console.log('Change country clicked')
    },
  }
  return (
    <>
      <BuyBox {...props} />
    </>
  )
}
