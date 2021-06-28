import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import {
  OrderSummary,
  OrderSummaryProps,
} from '../../../components/order-summary/order-summary'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('OrderSummary', () => {
  const props: OrderSummaryProps = {
    itemsCount: 2,
    subtotal: { value: 40, currency: '$' },
    vat: { value: 20, currency: '$' },
    vatPercentage: 20,
    total: { value: 60, currency: '$' },
    isExpanded: true,
    isLoading: false,
    loginOnClick: jest.fn(),
    continueOnClick: jest.fn(),
    chooseCountryOnClick: jest.fn(),
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: any

  // stimulate different screen width
  beforeAll(() => {
    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        outerWidth: width,
        innerHeight: height,
        outerHeight: height,
      }).dispatchEvent(new this.Event('resize'))
    }
  })
  beforeEach(() => {
    wrapper = shallow(<OrderSummary {...props} />)
  })

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('should render in smaller screen', () => {
    window.resizeTo(700, 500)
    wrapper = shallow(<OrderSummary {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('should render OrderSummary correctly', () => {
    const OrderSummary = wrapper.find('.OrderSummary')
    expect(OrderSummary).toHaveLength(1)
  })

  it('should render content correctly', () => {
    const content = wrapper.find('.content')
    expect(content).toHaveLength(1)
  })

  it('should render sub total correctly', () => {
    const subTotal = wrapper.find('.subTotal').find('.subTotalHeader').find('p')
    expect(subTotal).toHaveLength(1)
    expect(subTotal.html()).toContain('Subtotal (2 items)')
  })

  it('should render subtotal value correctly', () => {
    const subTotalValue = wrapper.find('.subTotalValue').find('p')
    expect(subTotalValue).toHaveLength(1)
    expect(subTotalValue.html()).toContain('$40')
  })

  it('should render Shipping & handling correctly', () => {
    const shippingAndHandling = wrapper
      .find('.shippingAndHandling')
      .find('.shippingAndHandlingHeader')
      .find('p')
    expect(shippingAndHandling).toHaveLength(1)
    expect(shippingAndHandling.html()).toContain('Shipping &amp; handling')
  })

  it('should call chooseCountryOnClick on Choose your country to estimate Button click', () => {
    const button = wrapper.find('.shippingAndHandlingValue').find('Button')
    expect(button.html()).toContain('Choose your country to estimate')
    button.simulate('click')
    expect(props.chooseCountryOnClick).toHaveBeenCalledTimes(1)
  })

  it('should render tax correctly', () => {
    const tax = wrapper.find('.tax').find('.taxHeader').find('p')
    expect(tax).toHaveLength(1)
    expect(tax.html()).toContain('VAT (20%)')
  })

  it('should render tax value correctly', () => {
    const taxValue = wrapper.find('.taxValue').find('p')
    expect(taxValue).toHaveLength(1)
    expect(taxValue.html()).toContain('$20')
  })

  it('should render Order total correctly', () => {
    const orderTotal = wrapper.find('.total').find('.totalHeader').find('p')
    expect(orderTotal).toHaveLength(1)
    expect(orderTotal.html()).toContain('Order total')
  })

  it('should render total value correctly', () => {
    const totalValue = wrapper.find('.totalValue').find('p')
    expect(totalValue).toHaveLength(1)
    expect(totalValue.html()).toContain('$60')
  })

  it('should call loginOnClick on Login to checkout Button click', () => {
    const button = wrapper.find('.loginButton')
    expect(button).toHaveLength(1)
    expect(button.html()).toContain('Login to checkout')
    button.simulate('click')
    expect(props.loginOnClick).toHaveBeenCalledTimes(1)
  })

  it('should call continueOnClick on Continue browsing Button click', () => {
    const button = wrapper.find('.continueButton')
    expect(button).toHaveLength(1)
    expect(button.html()).toContain('Continue browsing')
    button.simulate('click')
    expect(props.continueOnClick).toHaveBeenCalledTimes(1)
  })

  it('should check the responsiveness', () => {
    window.resizeTo(500, 300)
    const subTotalValue = wrapper.find('.subTotalValue').find('p')
    expect(subTotalValue).toHaveLength(1)
    expect(subTotalValue.html()).toContain('$40')
  })
})
