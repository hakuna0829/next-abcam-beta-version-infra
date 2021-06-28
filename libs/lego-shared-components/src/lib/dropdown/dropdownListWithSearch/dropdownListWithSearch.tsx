import React, {
  FC,
  LegacyRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import styles from './dropdownListWithSearch.module.css'
import { DropdownOption } from '@abcam-web/lego-shared-components/lib/dropdown/dropdown.type'
import { filterArrayByText } from '@abcam-web/lego-shared-components/lib/utils/filterArrayByText'
import {
  isEnterEvent,
  keyboardVerticalNavigationHandler,
} from '@abcam-web/lego-shared-components/lib/utils/keyboardEvents'
import {
  isBlurEvent,
  isFocusEvent,
} from '@abcam-web/lego-shared-components/lib/utils/syntheticEvents'
import { FILTER_MAX_RESULTS } from '@abcam-web/lego-shared-components/lib/dropdown/dropdownListWithSearch/constants'

export type DropdownListWithSearchProps = {
  title: string
  searchPlaceholder: string
  options?: DropdownOption[]
  onValueSelect?: (value: DropdownOption) => void
}

const DropdownListWithSearch: FC<DropdownListWithSearchProps> = React.memo(
  (props) => {
    const {
      options = [],
      title,
      searchPlaceholder,
      onValueSelect = () => null,
    } = props

    const [keywordFilter, setKeywordFilter] = useState('')
    const inputFieldRef = useRef<HTMLInputElement>()

    const filteredOptions = useMemo(() => {
      return filterArrayByText(options, keywordFilter, 'displayValue')?.slice(
        0,
        FILTER_MAX_RESULTS
      )
    }, [options, keywordFilter])

    const onInputChangeCallback = useCallback(
      (evt) => {
        setKeywordFilter(evt?.target?.value)
      },
      [setKeywordFilter]
    )

    const shouldShowOptions = keywordFilter && filteredOptions
    const shouldShowNoResult = keywordFilter && filteredOptions.length === 0

    // Set the focus on the input field when the component is mounted
    useEffect(() => inputFieldRef?.current?.focus(), [])

    return (
      <div className={styles.dropdownListWithSearchContainer}>
        <h1 className={styles.title}>{title}</h1>
        <input
          className={styles.searchBar}
          ref={inputFieldRef as LegacyRef<HTMLInputElement>}
          type={'text'}
          placeholder={searchPlaceholder}
          onChange={onInputChangeCallback}
          aria-label="filter-list"
        />
        <div className={styles.listContainer}>
          {shouldShowOptions && (
            <ListRenderer
              options={filteredOptions}
              clickCallback={onValueSelect}
            />
          )}
          {shouldShowNoResult && (
            <span className={styles.noResult}>No results</span>
          )}
        </div>
      </div>
    )
  }
)

const ListRenderer = React.memo(
  (props: {
    options: DropdownOption[]
    clickCallback: (value: DropdownOption) => void
  }) => {
    const { options, clickCallback } = props
    const [selectedItemIndex, setSelectedItemIndex] = useState(0)
    const [isFocused, setIsFocused] = useState(false)

    const keyupHandler = useCallback(
      (evt) => {
        return keyboardVerticalNavigationHandler(
          evt,
          selectedItemIndex,
          setSelectedItemIndex,
          options.length - 1
        )
      },
      [selectedItemIndex, setSelectedItemIndex, options]
    )

    const focusCallback = useCallback((evt) => {
      if (isFocusEvent(evt)) {
        return setIsFocused(true)
      }
      if (isBlurEvent(evt)) {
        return setIsFocused(false)
      }
    }, [])

    return (
      <ul
        role="presentation"
        className={styles.list}
        onKeyUp={keyupHandler}
        onFocus={focusCallback}
        onBlur={focusCallback}
      >
        {options.map((option, idx) => {
          return (
            <ListItemRenderer
              key={option.key}
              autofocus={selectedItemIndex === idx && isFocused}
              option={option}
              clickCallback={clickCallback}
            />
          )
        })}
      </ul>
    )
  }
)

const ListItemRenderer = React.memo(
  (props: {
    option: DropdownOption
    clickCallback: (value: DropdownOption) => void
    autofocus: boolean
  }) => {
    const { option, clickCallback, autofocus } = props
    const itemRef = useRef<HTMLDivElement>()

    const clickHandler = useCallback(() => {
      clickCallback(option)
    }, [clickCallback, option])

    useEffect(() => {
      if (!autofocus) {
        return
      }
      itemRef?.current?.focus()
    }, [autofocus])

    const keyupHandler = useCallback(
      (evt) => {
        if (isEnterEvent(evt)) {
          clickCallback(option)
        }
      },
      [clickCallback, option]
    )

    return (
      <li
        aria-label={option.displayValue}
        key={option.key}
        className={styles.listItem}
      >
        <div
          ref={itemRef as LegacyRef<HTMLDivElement>}
          tabIndex={0}
          className={styles.listItemText}
          role={'button'}
          onClick={clickHandler}
          onKeyUp={keyupHandler}
        >
          {option.displayValue}
        </div>
      </li>
    )
  }
)

export { DropdownListWithSearch }
