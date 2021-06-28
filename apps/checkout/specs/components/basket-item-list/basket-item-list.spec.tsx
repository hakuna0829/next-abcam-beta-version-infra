import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import {
  BasketItemList,
  BasketItemListProps,
} from '../../../components/basket-item-list/basket-item-list'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('BasketItemList', () => {
  const props: BasketItemListProps = {
    items: [
       {
    abId: 'ab120002',
    id: 'some-random-id',
    name: 'L-AP4, group III mGlu agonist',
    sizes: [
      {
        selected: true,
        value: 10,
        sku: 'ab290-10µg',
        unit: 'µg',
        quantities: [
          {
            value: 10,
            selected: true,
          },
          {
            value: 20,
          },
          {
            value: 30,
          },
        ],
      },
      {
        selected: true,
        value: 20,
        sku: 'ab290-10µg',
        unit: 'µg',
        quantities: [
          {
            value: 10,
            selected: true,
          },
          {
            value: 20,
          },
          {
            value: 30,
          },
        ],
      },
    ],
    availability: {
      inStock: true,
      restricted: false,
      message: 'Estimated delivery on Friday, 30 April',
    },
    unitPrice: {
      original: {
        value: 700,
        currency: '€',
      },
      price: {
        value: 700,
        currency: '€',
      },
    },
    itemTotal: {
      original: {
        value: 600,
        currency: '€',
      },
      price: {
        value: 550,
        currency: '€',
      },
    },
  },
  {
    abId: 'ab290',
    id: 'some-random-id',
    name: 'Anti-GFP antibody',
    sizes: [
      {
        selected: true,
        value: 10,
        sku: 'ab290-10µg',
        unit: 'µg',
        quantities: [
          {
            value: 10,
            selected: true,
          },
          {
            value: 20,
          },
          {
            value: 30,
          },
        ],
      },
      {
        selected: true,
        value: 20,
        sku: 'ab290-10µg',
        unit: 'µg',
        quantities: [
          {
            value: 10,
            selected: true,
          },
          {
            value: 20,
          },
          {
            value: 30,
          },
        ],
      },
    ],
    availability: {
      inStock: false,
      restricted: false,
      message: 'Estimated delivery on Friday, 30 April',
    },
    unitPrice: {
      original: {
        value: 700,
        currency: '€',
      },
      price: {
        value: 700,
        currency: '€',
      },
    },
    itemTotal: {
      original: {
        value: 600,
        currency: '€',
      },
      price: {
        value: 550,
        currency: '€',
      },
    },
  }
    ],
    sizeOnChange: (): void => {
      console.log('sizeOnChange')
    },
    deleteOnClick: jest.fn(),
    quantityOnChange: (): void => {
      console.log('quantityOnChange')
    },
    backURL: '',
    isLoading: false,
    simplified: false
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
    wrapper = shallow(<BasketItemList {...props} />)
  })

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should render in smaller screen', () => {
    window.resizeTo(500, 600)
    const component = shallow(<BasketItemList {...props} />)
    expect(toJson(component)).toMatchSnapshot()

    const basketItem = component.find('BasketItem')
    const deleteButton = basketItem.at(0).dive().find('Button')
    expect(deleteButton).toHaveLength(1)
  })

  it('should render BasketItemList header correctly', () => {
    const header = wrapper.find('BasketItem').at(0).dive().find('.columnheader')
    const item = header.at(0)
    expect(item.html()).toContain('Item')
    const size = header.at(1)
    expect(size.html()).toContain('Size')
    const availability = wrapper.find('BasketItem').at(0).dive().find('Availability').dive().find('.columnheader')
    expect(availability.html()).toContain('Availability')
    const quantity = header.at(2)
    expect(quantity.html()).toContain('Quantity')
    const unitPrice = wrapper.find('BasketItem').at(0).dive().find('UnitPrice').dive().find('.columnheader')
    expect(unitPrice.html()).toContain('Unit price')
    const itemTotal = header.at(3)
    expect(itemTotal.html()).toContain('Item total')
  })

  it('should render BasketItem for each record', () => {
    const basketItem = wrapper.find('BasketItem')
    expect(basketItem).toHaveLength(2)
  })

  it('should render product code and number correctly', () => {
    const basketItem = wrapper.find('BasketItem')
    const number = basketItem.at(0).dive().find('.text-grey60').find('span')
    expect(number.html()).toContain('#1')
    const productCode = basketItem.at(0).dive().find('.text-grey60').at(0)
    expect(productCode.html()).toContain('ab120002')
    const numberTwo = basketItem.at(1).dive().find('.text-grey60').find('span')
    expect(numberTwo.html()).toContain('#2')
    const productCodeTwo = basketItem.at(1).dive().find('.text-grey60').at(0)
    expect(productCodeTwo.html()).toContain('ab290')
  })

  it('should render title correctly', () => {
    const basketItem = wrapper.find('BasketItem')
    const title = basketItem.at(0).dive().find('a')
    expect(title.html()).toContain('L-AP4, group III mGlu agonist (ab120002)')
    const titleTwo = basketItem.at(1).dive().find('a')
    expect(titleTwo.html()).toContain(
      'Anti-GFP antibody (ab290)'
    )
  })

  it('should render Size correctly', () => {
    const basketItem = wrapper.find('BasketItem')
    const size = basketItem.at(0).dive().find('.cell').at(0)
    expect(size.html()).toContain('10 µg')
    const sizeTwo = basketItem.at(1).dive().find('.cell').at(0)
    expect(sizeTwo.html()).toContain('10 µg')
  })

  it('should render Availability correctly', () => {
    const basketItem = wrapper.find('BasketItem')
  
    const availabilityStatus = basketItem
      .at(0)
      .dive() 
      .find('Availability')
      .dive()
      .find('.text-green45')
      .at(0)
   
    expect(availabilityStatus.html()).toContain('In Stock.')
    const availabilityMessage = basketItem
      .at(1)
      .dive()
      .find('Availability')
      .dive()
      .find('.cell')
      .find('p')
      .at(2)
      
    expect(availabilityMessage.html()).toContain(`${props.items[1].availability.message}`)
    const availabilityStatusTwo = basketItem
      .at(1)
      .dive()
      .find('Availability')
      .dive()
      .find('.cell')
      .find('p')
      .at(1)
    expect(availabilityStatusTwo.html()).toContain('Available to order.')
    const availabilityMessageTwo = basketItem
      .at(1)
      .dive()
      .find('Availability')
      .dive()
      .find('.cell')
      .find('p')
      .at(2)
    expect(availabilityMessageTwo.html()).toContain(`${props.items[1].availability.message}`)
  })

  it('should render Quantity correctly', () => {
    const basketItem = wrapper.find('BasketItem')
    const availabilityStatus = basketItem.at(0).dive().find('.cell').at(2)
    expect(availabilityStatus.html()).toContain('1')
    const availabilityStatusTwo = basketItem.at(1).dive().find('.cell').at(2)
    expect(availabilityStatusTwo.html()).toContain('1')
  })

  it('should render unit price correctly', () => {
    const basketItem = wrapper.find('BasketItem')
    const unitPrice = basketItem.at(0).dive().find('.text-body-medium').at(1)
    expect(unitPrice.html()).toContain(`${props.items[0].unitPrice.original.currency}${props.items[0].unitPrice.original.value}`)
    const unitPriceTwo = basketItem.at(1).dive().find('.text-body-medium').at(1)
    expect(unitPriceTwo.html()).toContain(`${props.items[1].unitPrice.original.currency}${props.items[1].unitPrice.original.value}`)
  })

  it('should render item Total correctly', () => {
    const basketItem = wrapper.find('BasketItem')
    const itemTotal = basketItem.at(0).dive().find('OriginalPrice').dive().find('p')
    expect(itemTotal.html()).toContain(`${props.items[0].unitPrice.original.currency}${props.items[0].unitPrice.original.value}`)
    const itemTotalTwo = basketItem.at(1).dive().find('OriginalPrice').dive().find('p')
    expect(itemTotalTwo.html()).toContain(`${props.items[1].unitPrice.original.currency}${props.items[1].unitPrice.original.value}`)
  })

  it('should delete item on delete click', () => {
    const basketItem = wrapper.find('BasketItem')
    const deleteButton = basketItem.at(0).dive().find('Button')
    expect(deleteButton).toHaveLength(1)
    deleteButton.simulate('click')
    expect(props.deleteOnClick).toHaveBeenCalledTimes(1)
  })
})
