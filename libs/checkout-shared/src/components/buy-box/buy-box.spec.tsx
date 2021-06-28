import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { BuyBox, BuyBoxProps } from './buy-box'
import Adapter from 'enzyme-adapter-react-16'
import { SizesBox } from '../sizes-box/sizes-box'

Enzyme.configure({ adapter: new Adapter() })

describe('BuyBox', () => {
  const props: BuyBoxProps = {
    product: {
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
    },
    onChangeCountry: jest.fn(),
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: any
  const title = 'Currently unavailable'
  const message =
    'We are sorry, but this product is not available to customers in this country/region.'
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
    wrapper = shallow(<BuyBox {...props} />)
  })
  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should render in smaller screen', () => {
    window.resizeTo(500, 600)
    const component = shallow(<BuyBox {...props} />)
    expect(toJson(component)).toMatchSnapshot()
  })

  it('should render restriction message in smaller screen', () => {
    window.resizeTo(500, 600)
    const component = shallow(<BuyBox {...props} />)
    component.setProps({
      restriction: {
        title: title,
        message: message,
      },
    })
    expect(toJson(component)).toMatchSnapshot()
  })

  it('should return restricted message', () => {
    wrapper.setProps({
      product: {
        restriction: {
          title: title,
          message: message,
        },
      }
    })
    const restrictionContainer = wrapper.find('.restrictionContainer')
    expect(restrictionContainer).toHaveLength(1)
  })

  it('should render restriction title and message correctly', () => {
    wrapper.setProps({
      product: {
       restriction: {
          title: title,
          message: message,
        },
      }
    })
    const restrictionContainerTitle = wrapper.find('.title')
    expect(restrictionContainerTitle).toHaveLength(1)
    expect(restrictionContainerTitle.html()).toContain(title)
    const restrictionContainerMessage = wrapper.find(
      '.message'
    ).at(0)
    expect(restrictionContainerMessage.html()).toContain(message)
  })

  it('should render BuyBox', () => {
    expect(wrapper.exists()).toBe(true)
    const buyBox = wrapper.find('.BuyBox')
    expect(buyBox).toHaveLength(1)
  })

  it('should render SizesBox', () => {
    const sizesBox = wrapper.find(SizesBox)
    expect(sizesBox).toHaveLength(1)
  })

  it('should render price container', () => {
    const priceContainer = wrapper.find('.priceContainer')
    expect(priceContainer).toHaveLength(1)
    expect(priceContainer.html()).toContain(`${props.product.sizes?.[0].price.currency}${props.product.sizes?.[0].price.value}`)
  
    const priceMessage = wrapper.find('.priceContainer').find('.message')
    expect(priceMessage).toHaveLength(1)
    expect(priceMessage.html()).toContain('All prices exclude sales tax.')
  })

  it('should render quantity container', () => {
    const quantityContainer = wrapper.find('.quantityContainer')
    expect(quantityContainer).toHaveLength(1)

    const select = wrapper.find('Select')
    expect(select).toHaveLength(1)

    const quantityMessage = quantityContainer.find('.message').at(0)
    expect(quantityMessage.html()).toContain(`${props.product.sizes?.[0].maxQuantity}+ in stock`)
  })

  it('should render add to basket Button', () => {
    const addButton = wrapper.find('.addButton')
    expect(addButton).toHaveLength(1)
    expect(addButton.html()).toContain('Add to basket')
  })
  
  it('should render shipping container', () => {
    const messageConatiner = wrapper.find('.shippingContainer')
    expect(messageConatiner).toHaveLength(1)
  })

  it('should render shipping country correctly', () => {
    const shippingCountry = wrapper.find('.message').at(3)
    expect(shippingCountry.html()).toContain('Shipping to United Kingdom')
  })

  it('should render change button', () => {
    const change = wrapper.find('.countrySelector')
    expect(change).toHaveLength(1)
    change.simulate('click')
    expect(props.onChangeCountry).toHaveBeenCalled()
  })
})
