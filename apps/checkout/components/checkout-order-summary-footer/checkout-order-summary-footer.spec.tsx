import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import {
  CheckoutOrderSummaryFooter,
  CheckoutOrderSummaryFooterProps,
} from './checkout-order-summary-footer'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('CheckoutOrderSummaryFooter', () => {
  const props: CheckoutOrderSummaryFooterProps = {
    isLoading: false,
    total: { value: 723.2, currency: '£' },
    placeOrderOnClick: jest.fn(),
    termsAndConditionsOnClick: jest.fn(),
  }
  let wrapper: any

  beforeEach(() => {
    wrapper = shallow(<CheckoutOrderSummaryFooter {...props} />)
  })

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should render total header correctly', () => {
    const totalHeader = wrapper.find('.totalHeader')
    expect(totalHeader).toHaveLength(1)
    expect(totalHeader.html()).toContain('Order total')
  })

  it('should render total value correctly', () => {
    const totalValue = wrapper.find('.totalValue')
    expect(totalValue).toHaveLength(1)
    expect(totalValue.html()).toContain(
      `${props.total.currency}${props.total.value}`
    )
  })

  it('should render Place order buuton correctly', () => {
    const placeOrder = wrapper.find('Button').at(0)
    expect(placeOrder.html()).toContain('Place order')
  })

  it('shpuld render termsAndConditions correctly', () => {
    const termsAndConditions = wrapper.find('.termsAndConditions').at(0)
    expect(termsAndConditions.html()).toContain(
      'By placing your order, you acknowledge that you read and agreed to'
    )
    const termsAndConditionsButton = termsAndConditions.find('Button')
    expect(termsAndConditionsButton.html()).toContain(
      'Abcam&#x27;s terms and conditions'
    )
  })
})
