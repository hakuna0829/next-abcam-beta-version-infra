import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { SizesBox } from './sizes-box'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const sizes = [
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
    default: true,
    price: {
      value: 700,
      currency: '€',
    },
    maxQuantity: 10,
  },
  {
    value: 1500,
    unit: 'µg',
    default: true,
    price: {
      value: 700,
      currency: '€',
    },
    maxQuantity: 10,
  },
  {
    value: 2000,
    unit: 'µg',
    default: true,
    price: {
      value: 700,
      currency: '€',
    },
    maxQuantity: 10,
  },
]
describe('SizesBox', () => {
  const props = {
    onChange: jest.fn(),
    sizes: sizes,
    selectedSize: sizes[0],
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: any
  beforeEach(() => {
    wrapper = shallow(<SizesBox {...props} />)
  })
  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should render SizesBox correctly', () => {
    expect(wrapper.exists()).toBe(true)
    const SizesBox = wrapper.find('.SizesBox')
    expect(SizesBox).toHaveLength(1)
  })

  it('should render SizeButton', () => {
    const SizeButton = wrapper.find('SizeButton')
    expect(SizeButton).toHaveLength(4)
  })

  it('should change attribute on click', () => {
    const button = wrapper.find('SizeButton').at(0).dive().find('Button')
    expect(button).toHaveLength(1)
    wrapper.setProps({
      selectedSize: sizes[1],
    })
    const buttonWithGreenColor = wrapper
      .find('SizeButton')
      .at(1)
      .dive()
      .find('.selectedButton')
    expect(buttonWithGreenColor).toHaveLength(1)
  })

  it('should change the color of only selected button', () => {
    const selectedButton = wrapper
      .find('SizeButton')
      .at(0)
      .dive()
      .find('Button')
      .find('.selectedButton')
    expect(selectedButton).toHaveLength(1)
    wrapper.setProps({
      selectedSize: sizes[1],
    })
    const grrenButton = wrapper
      .find('SizeButton')
      .at(1)
      .dive()
      .find('.selectedButton')
    expect(grrenButton).toHaveLength(1)
    const firstButton = wrapper
      .find('SizeButton')
      .at(0)
      .dive()
      .find('.selectedButton')
    expect(firstButton).toHaveLength(0)
  })
})
