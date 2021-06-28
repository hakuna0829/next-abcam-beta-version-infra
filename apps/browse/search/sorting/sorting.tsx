import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useIntl } from 'react-intl'

import { sortingMessages } from '@browse/messages'
import {
  Dropdown,
  DropDownRow,
  DropDownType,
  SelectorType,
} from '@browse/components/dropdown'
import { ApplySorting } from '@browse/store/actions/search-result-actions'
import { getSorting } from '@browse/store/selectors/search-result-selectors'
import styles from './sorting.module.css'

const allSorting = ['relevance', 'publications', 'recency']

export const Sorting = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const handleChangeSorting = (value: string) => {
    dispatch(ApplySorting(value))
  }
  const sorting = useSelector(getSorting)

  return sorting ? (
    <Dropdown
      label={
        <>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {intl.formatMessage(sortingMessages[sorting])}
        </>
      }
      data-cy={'relevance-button'}
      selectorType={SelectorType.Base}
      onSelect={handleChangeSorting}
      size={'small'}
      type={DropDownType.Single}
    >
      {allSorting.map((item, index) => (
        <DropDownRow
          tabIndex={0}
          key={index}
          onClick={() => handleChangeSorting(item)}
        >
          <span className={styles.sorting}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            {intl.formatMessage(sortingMessages[item])}
          </span>
        </DropDownRow>
      ))}
    </Dropdown>
  ) : null
}
