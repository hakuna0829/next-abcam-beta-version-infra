import React, { FC } from 'react'
import { BasketItem as BasketItemType } from '../../entity/basket-item.type'
import { Select, Button } from '@abcam-web/lego-shared-components/lib'
import { SelectOption } from '@abcam-web/lego-shared-components/lib/select/select.type'

import { ArrowLeft } from '@abcam-web/lego-shared-components/icons'
import { Bin } from '@abcam-web/lego-shared-components/icons'
import { Cart } from '@abcam-web/lego-shared-components/icons'

import classNames from 'classnames'
import styles from './basket-item-list.module.css'

type sizeOnChangeArgs = {
  id: string
  abId: string
  name: string
  sku: string | number
  newSize: number | string
}

type deleteOnClickArgs = {
  id: string
  abId: string
  name: string
}

type quantityOnChangeArgs = {
  id: string
  abId: string
  name: string
  sku: string | number
  newQuantity: number | string
}

export interface BasketItemListProps {
  items: BasketItemType[]
  deleteOnClick: ({ id, abId, name }: deleteOnClickArgs) => void
  sizeOnChange: ({ id, abId, name, sku, newSize }: sizeOnChangeArgs) => void
  quantityOnChange: ({
    id,
    abId,
    name,
    sku,
    newQuantity,
  }: quantityOnChangeArgs) => void
  backURL: string
  isLoading: boolean
  simplified?: boolean
  isUpdating?: boolean
  indexUpdated?: number
}
interface BasketItemProps {
  index: number
  item: BasketItemType
  deleteOnClick: ({ id, abId, name }: deleteOnClickArgs) => void
  sizeOnChange: ({ id, abId, name, sku, newSize }: sizeOnChangeArgs) => void
  quantityOnChange: ({
    id,
    abId,
    name,
    sku,
    newQuantity,
  }: quantityOnChangeArgs) => void
  simplified?: boolean
  isUpdating?: boolean
  indexUpdated?: number
}

interface OriginalPriceProps {
  price: number
  currency: string
}

interface UnitPriceProps {
  columnHeadersClass: string
  wrapperStyle: React.CSSProperties
  currency: string
  price: number
  greyOutWhilstUpdating: string
}

interface AvailabilityProps {
  columnHeadersClass: string
  wrapperStyle: React.CSSProperties
  inStock: boolean
  message: string
  greyOutWhilstUpdating: string
}

const getOrder = (index: number) =>
  ({ '--order': 10 * index } as React.CSSProperties)

const renderFakeSpaceToCaterForProductCode = () => (
  <p className={`${styles.fakeCode} hidden mb-1`}>&nbsp;</p>
)

const EmptyBasket: FC<{ backURL: string }> = ({ backURL }) => {
  return (
    <section className="text-center">
      <div
        className={`${styles.emptyBasketWrapper} inline-flex flex-col items-center text-grey60 text-body-medium gap-y-2`}
      >
        <h2 className="sr-only">Basket is empty</h2>
        <Cart mycolor="text-white" />
        <p>Your shopping basket is currently empty</p>
        <footer className="w-full pt-8 mt-8 border-t smd:hidden">
          <Button
            as="a"
            variant="secondary"
            size="large"
            href={backURL}
            iconLeft={<ArrowLeft />}
          >
            Back
          </Button>
        </footer>
      </div>
    </section>
  )
}

const OriginalPrice: FC<OriginalPriceProps> = ({ price, currency }) => (
  <p className={`text-grey60 line-through text-right mb-1`}>
    {currency}
    {price}
  </p>
)

const Availability: FC<AvailabilityProps> = ({
  columnHeadersClass,
  wrapperStyle,
  inStock,
  message,
  greyOutWhilstUpdating,
}) => {
  const availabilityTextClass = classNames({ 'text-green45': inStock })
  return (
    <div
      className={`${styles.item} ${styles.availability}`}
      style={wrapperStyle}
    >
      <p className={columnHeadersClass}>Availability</p>
      <div className={`${styles.cell} ${greyOutWhilstUpdating}`}>
        {renderFakeSpaceToCaterForProductCode()}
        <p className={availabilityTextClass}>
          {inStock ? 'In Stock. ' : 'Available to order. '}
        </p>
        <p className={availabilityTextClass}>{message}</p>
      </div>
    </div>
  )
}

const UnitPrice: FC<UnitPriceProps> = ({
  columnHeadersClass,
  wrapperStyle,
  currency,
  price,
  greyOutWhilstUpdating,
}) => {
  return (
    <div className={`${styles.item} ${styles.unitPrice}`} style={wrapperStyle}>
      <p className={columnHeadersClass}>Unit price</p>
      <div className={`${styles.cell} ${greyOutWhilstUpdating}`}>
        {renderFakeSpaceToCaterForProductCode()}
        <p className="text-body-medium">
          {currency}
          {price}
        </p>
      </div>
    </div>
  )
}

const BasketItem: FC<BasketItemProps> = ({
  item,
  index,
  simplified,
  sizeOnChange,
  isUpdating,
  deleteOnClick,
  quantityOnChange,
}) => {
  const order = getOrder(index)
  const columnHeadersClass = `${styles.columnheader} ${classNames({
    hidden: index && !simplified,
    'mb-3': !simplified,
    'mb-1': simplified,
  })}`

  const hideAtSimplified = classNames({ hidden: simplified })
  const greyOutWhilstUpdating = classNames({ 'opacity-20': isUpdating })

  const { sizes, name, abId, id } = item

  const mapSizesToSelectOptions: SelectOption[] = sizes.map((item) => ({
    key: item?.value,
    displayValue: `${item?.value?.toString()} ${item.unit}`,
  }))
  const currentSize = sizes.find((item) => item.selected)
  const mapQuantitiesToSelectOptions = currentSize?.quantities?.map((item) => ({
    key: item?.value,
    displayValue: item?.value?.toString(),
  }))

  const { sku } = currentSize || {}

  return (
    <>
      <div className={`${styles.item} ${styles.code}`} style={order}>
        <p className={`${columnHeadersClass} ${hideAtSimplified}`}>Item</p>

        <p className="mb-1 text-grey60">
          <span className="mr-3">#{index + 1}</span>
          {abId}
        </p>
        {simplified && (
          <span className="text-grey20">
            {name} ({abId})
          </span>
        )}
        {!simplified && (
          <a
            href={`product/${abId}/overview/all`}
            className={`text-body-medium ${styles['blue-link']}`}
          >
            {name} ({abId})
          </a>
        )}
      </div>
      <div className={`${styles.item} ${styles.sizes}`} style={order}>
        <p className={columnHeadersClass}>Size</p>
        <div className={`${styles.cell} ${greyOutWhilstUpdating}`}>
          {item.sizes.length > 1 ? (
            <Select
              options={mapSizesToSelectOptions}
              onChange={(val) => {
                sizeOnChange({ abId, id, name, sku, newSize: val.key })
              }}
            />
          ) : (
            <p className="text-body-medium text-grey20">
              {currentSize?.value} {currentSize?.unit}
            </p>
          )}
        </div>
      </div>

      {!simplified && (
        <Availability
          columnHeadersClass={columnHeadersClass}
          wrapperStyle={order}
          inStock={item?.availability?.inStock}
          message={item?.availability?.message}
          greyOutWhilstUpdating={greyOutWhilstUpdating}
        />
      )}

      <div className={`${styles.item} ${styles.quantity}`} style={order}>
        <p className={columnHeadersClass}>Quantity</p>
        <div className={`${styles.cell} ${greyOutWhilstUpdating}`}>
          <Select
            options={mapQuantitiesToSelectOptions}
            onChange={(val) => {
              quantityOnChange({
                id,
                abId,
                name,
                sku,
                newQuantity: val.key,
              })
            }}
          />
        </div>
      </div>

      {!simplified && (
        <UnitPrice
          columnHeadersClass={columnHeadersClass}
          wrapperStyle={order}
          currency={item?.unitPrice?.original?.currency}
          price={item?.unitPrice?.original?.value}
          greyOutWhilstUpdating={greyOutWhilstUpdating}
        />
      )}

      <div
        className={`${styles.item} ${styles.totalPrice} ${greyOutWhilstUpdating}`}
        style={order}
      >
        <p className={`${columnHeadersClass} ${hideAtSimplified}`}>
          Item total
        </p>
        <div className={`${styles.cell} ${greyOutWhilstUpdating}`}>
          {item?.unitPrice?.original ? (
            <OriginalPrice
              price={item?.unitPrice?.original?.value}
              currency={item?.unitPrice?.original?.currency}
            />
          ) : (
            renderFakeSpaceToCaterForProductCode()
          )}
          <p className="text-body-medium">
            {item?.unitPrice?.price?.currency}
            {item?.unitPrice?.price?.value}
          </p>
        </div>
      </div>
      <div
        className={`${styles.item} ${styles.bin} justify-self-end`}
        style={order}
      >
        <p className={`${columnHeadersClass} ${hideAtSimplified}`}>&nbsp;</p>
        <div className={styles.cell}>
          <Button
            variant="quinary"
            size="medium"
            iconButton={true}
            onClick={() => deleteOnClick({ abId, id, name })}
            iconLeft={<Bin />}
          ></Button>
        </div>
      </div>
      <div className={`${styles.item} ${styles.separator}`} style={order}>
        <hr className="h-px border-0 bg-interactiveGreyTransparentActive" />
      </div>
    </>
  )
}

const BasketItemList: FC<BasketItemListProps> = ({
  isLoading,
  items,
  backURL,
  simplified,
  deleteOnClick,
  sizeOnChange,
  quantityOnChange,
  isUpdating,
  indexUpdated,
}) => {
  const isEmptyBasket = !isLoading && !items?.length
  const isNotEmptyBasket = !isLoading && items?.length
  return (
    <div className="text-black">
      {isLoading && <div>Loading...</div>}
      {isEmptyBasket && <EmptyBasket backURL={backURL} />}
      {isNotEmptyBasket && (
        <div
          className={classNames(
            `text-body-small gap-3 grid`,
            { [styles.itemGridSimplified]: simplified },
            { [styles.itemGridFull]: !simplified }
          )}
          role="table"
        >
          {items.map((item, index) => (
            <BasketItem
              key={index}
              item={item}
              index={index}
              deleteOnClick={deleteOnClick}
              sizeOnChange={sizeOnChange}
              quantityOnChange={quantityOnChange}
              simplified={simplified}
              isUpdating={isUpdating && index === indexUpdated}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { BasketItemList }
