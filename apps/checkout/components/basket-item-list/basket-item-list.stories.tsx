import React, { FC, useState } from 'react'
import { BasketItemList, BasketItemListProps } from './basket-item-list'
import { basketItemsMock, mockItems } from '../../mocks/data/shopping-basket'
import classNames from 'classnames'
export default {
  component: BasketItemList,
  title: 'BasketItemList',
}

const BasketItemListExample: FC<BasketItemListProps> = (props) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [indexUpdated, setIndexUpdated] = useState(-1)
  const [items, setItems] = useState(props.items)

  const mockProps = {
    ...props,
    items,
    isUpdating,
    indexUpdated,
  }

  return (
    <div
      className={classNames({ 'max-w-screen-xl': props.simplified })}
      style={{ width: props.simplified ? '70%' : '100%' }}
    >
      <BasketItemList {...mockProps} />
    </div>
  )
}

const Template = (args) => <BasketItemListExample {...args} />
export const primary = Template.bind({})

primary.args = {
  items: mockItems(5),
  deleteOnClick: () => true,
  sizeOnChange: () => true,
  quantityOnChange: () => true,
  backURL: '#',
  isLoading: false,
  simplified: false,
}
