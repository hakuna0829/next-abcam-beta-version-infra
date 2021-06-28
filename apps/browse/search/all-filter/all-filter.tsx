import React, { useCallback, useMemo, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { State } from '@browse/store'

import {
  AddFilter,
  AddOneFilterByType,
  RemoveFilter,
} from '@browse/store/actions/search-result-actions'
import { Accordion, IAccordionItem } from '@browse/components/accordion'
import { Checkbox } from '@browse/components/checkbox'
import { Facet, Filter } from '@browse/search/search.type'
import styles from '@browse/search/facet-item/facet-item.module.css'
import { AllFilterProps } from '@browse/search/all-filter/all-filter.types'

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max)) + 1
}

export const AllFilters: React.FC<AllFilterProps> = ({ facets }) => {
  const dispatch = useDispatch()
  const getHandleSelectCheckbox = React.useCallback(
    (facet: Facet) => (label: string, newValue: boolean) => {
      if (newValue) {
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
    },
    [dispatch]
  )

  const getHandleSelectRadio = useCallback(
    (facet: Facet) => (label: string, newValue: boolean) => {
      dispatch(
        AddOneFilterByType({
          label,
          type: facet.type,
        })
      )
    },
    [dispatch]
  )

  const search = useSelector((state: State) => state.searchResultReducer.search)
  const filters = React.useMemo(() => search?.filters || [], [search?.filters])

  const accordionItems: IAccordionItem[] = useMemo(
    () =>
      facets
        ? facets.map(
            (facet, index) =>
              ({
                headerCount: filters.filter(
                  (filter: Filter) => filter.type === facet.type
                ).length,
                headerLabel: facet.type,
                render: () => (
                  <>
                    {facet.values?.map((option, index2) => {
                      const randomInt = getRandomInt(1000)
                      return (
                        <div
                          className={styles.filterRow}
                          data-cy={'filter-row'}
                          key={index + index2}
                        >
                          <Checkbox
                            id={'checkbox-' + randomInt}
                            label={option.label}
                            name={'checkbox-' + randomInt}
                            checked={filters.find(
                              (filter: Filter) =>
                                filter.type === facet.type &&
                                filter.label === option.label
                            )}
                            type={
                              facet.displayOption === 'MULTI'
                                ? 'checkbox'
                                : 'radio'
                            }
                            onCheckChange={
                              facet.displayOption === 'MULTI'
                                ? getHandleSelectCheckbox(facet)
                                : getHandleSelectRadio(facet)
                            }
                          />
                          <span className={styles.filterCount}>
                            {option.count}
                          </span>
                        </div>
                      )
                    })}
                  </>
                ),
                onToggle: () => undefined,
              } as IAccordionItem)
          )
        : [],
    [facets, filters, getHandleSelectCheckbox, getHandleSelectRadio]
  )

  return (
    <>
      <Accordion items={accordionItems} />
      {/*<ProductBrandFiltersWrapper>*/}
      {/*    {productBrandFilters.map((filter, index) => (*/}
      {/*        <div key={index}>*/}
      {/*            <ProductBrandFilter filter={filter} />*/}
      {/*        </div>*/}
      {/*    ))}*/}
      {/*</ProductBrandFiltersWrapper>*/}
    </>
  )
}
