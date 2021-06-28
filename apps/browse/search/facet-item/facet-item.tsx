import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '@browse/store'
import {
  AddFilter,
  AddOneFilterByType,
  RemoveFilter,
  ResetFilterByType,
} from '@browse/store/actions/search-result-actions'
import { Checkbox } from '@browse/components/checkbox'
import { Dropdown } from '@browse/components/dropdown'
import { Facet, Filter } from '@browse/search/search.type'
import { useIntl } from 'react-intl'
import styles from './facet-item.module.css'
import { SelectorType } from '@browse/components/dropdown'
import { FacetItemProps } from './facet-item.types'
import { facetMessages } from '@browse/messages'

export const FacetItem: React.FC<FacetItemProps> = ({ facet, ...props }) => {
  const dispatch = useDispatch()
  const intl = useIntl()
  const search = useSelector((state: State) => state.searchResultReducer.search)

  const filters = search?.filters

  const getHandleSelectCheckbox = (facet: Facet) => (
    label: string,
    newFilter: boolean
  ) => {
    if (newFilter) {
      dispatch(
        AddFilter({
          label,
          type: facet.type,
        })
      )
    } else {
      dispatch(
        RemoveFilter({
          label,
          type: facet.type,
        })
      )
    }
  }

  const getHandleSelectRadio = (facet: Facet) => (label: string) => {
    dispatch(
      AddOneFilterByType({
        label,
        type: facet.type,
      })
    )
  }

  const getHandleClearAction = (facet: Facet) => (label: string) => {
    dispatch(
      ResetFilterByType({
        label,
        type: facet.type,
      })
    )
  }

  const itemsCount = useMemo(() => {
    return filters.filter((filter: Filter) => filter.type === facet.type).length
  }, [filters])

  return (
    <Dropdown
      label={
        <>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore*/}
          {intl.formatMessage(facetMessages[facet.type])}
          {itemsCount > 0 ? (
            <div className={styles.countComponent}>{itemsCount}</div>
          ) : (
            ''
          )}
        </>
      }
      type={facet.displayOption}
      selectorType={
        facet.displayOption === 'MULTI'
          ? SelectorType.CheckBox
          : SelectorType.RadioButton
      }
      clearAction={getHandleClearAction(facet)}
      showFooter
      {...props}
    >
      {facet.values?.map((value, index) => (
        <div
          className={styles.filterRow}
          data-cy={`filter-row-${value.label}`}
          key={index}
        >
          <Checkbox
            id={`${value.label}_${index}`}
            label={value.label}
            type={facet.displayOption === 'MULTI' ? 'checkbox' : 'radio'}
            name={value.label}
            checked={filters.find(
              (filter: Filter) =>
                filter.type === facet.type && filter.label === value.label
            )}
            onCheckChange={
              facet.displayOption === 'MULTI'
                ? getHandleSelectCheckbox(facet)
                : getHandleSelectRadio(facet)
            }
          />
          <span className={styles.filterCount}>{value.count}</span>
        </div>
      ))}
    </Dropdown>
  )
}
