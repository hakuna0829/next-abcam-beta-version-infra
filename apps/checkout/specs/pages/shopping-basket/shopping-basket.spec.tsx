import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ShoppingBasket from '../../../pages/shopping-basket/shopping-basket'
import { ArrowLeft } from '@abcam-web/lego-shared-components/icons'
import Adapter from 'enzyme-adapter-react-16'
import { OrderSummary } from '@checkout/components/order-summary/order-summary'

Enzyme.configure({ adapter: new Adapter() })

describe('ShoppingBasket', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = shallow(<ShoppingBasket />)
  })

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should render shoppingBasket correctly', () => {
    const shoppingBasket = wrapper.find('.shoppingBasket')
    expect(shoppingBasket).toHaveLength(1)
  })

  it('should render back button correctly', () => {
    const backButton = wrapper.find('.backButton')
    expect(backButton).toHaveLength(1)
    expect(backButton.html()).toContain('Back')
    const arrowLeft = wrapper.find(ArrowLeft)
    expect(arrowLeft).toHaveLength(1)
  })

  it('should render title correctly', () => {
    const title = wrapper.find('.title')
    expect(title).toHaveLength(1)
  })

  it('should render BasketItemList correctly', () => {
    const content = wrapper.find('.content')
    expect(content).toHaveLength(1)
    const basketItemList = wrapper.find('BasketItemList')
    expect(basketItemList).toHaveLength(1)
  })

  it('should render OrderSummary correctly', () => {
    const orderSummaryContainer = wrapper.find('.orderSummaryContainer')
    expect(orderSummaryContainer).toHaveLength(1)
    const orderSummary = wrapper.find('OrderSummary')
    expect(OrderSummary).toHaveLength(1)
  })
})
