import styled from 'styled-components'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { ReactComponent as Magnifier } from '@browse/public/icons/magnifier.svg'
import { ReactComponent as Plus } from '@browse/public/icons/plus.svg'
import { ReactComponent as Cross } from '@browse/public/icons/cross.svg'
import { ReactComponent as ChevronLeft } from '@browse/public/icons/chevron-left.svg'
import { useDebounce } from '@react-hook/debounce'
import {
  loadRecommendedFacets,
  loadSuggestions,
} from '@browse/store/effects/search-effects'
import {
  SetKeywords,
  SetSuggestions,
} from '@browse/store/actions/search-actions'
import { State } from '@browse/store'
import {
  AddFilter,
  RemoveFilter,
  ResetFilters,
} from '@browse/store/actions/search-result-actions'
import { SearchState } from '@browse/store/reducers/search-reducer'
import messages, { facetItemMessages, facetMessages } from '@browse/messages'
import { FormattedMessage, useIntl } from 'react-intl'
import { loadSearch } from '@browse/store/effects/search-result-effect'
import { Lozenge } from '@browse/components/lozenge'
import { mediumLarge } from '@browse/breakpoints'
import { LoadSummaryError } from '@browse/store/actions/product-actions'
import styles from '@browse/search/search-input/search-input.module.css'
import classNames from 'classnames'
import { getIsHomePage } from '@browse/store/selectors/selectors'
import { Entity, Filter, Suggestion } from '@browse/search/search.type'
import {
  SearchInputProps,
  SearchStateProps,
} from '@browse/search/search-input/search-input.type'
import { testTagProp } from '@browse/common/tagging'
import { routes } from '@browse/routes/routes'

const Icon = styled(Magnifier)`
  float: right;
  margin-right: 1rem;
  width: 2rem;
  height: 2rem;
  min-width: 1rem;

  & path {
    fill: white;
  }
`

const IconWrap = styled.span<SearchStateProps>`
  @media (max-width: ${mediumLarge}px) {
    display: ${({ searchState }) =>
      searchState === 'activeSearch' ? 'none' : 'flex'};
  }
`

const GoOut = styled(ChevronLeft)`
  float: right;
  margin-right: 1rem;
  width: 2rem;
  height: 2rem;
  min-width: 1rem;

  & path {
    fill: white;
  }

  @media (min-width: ${mediumLarge}px) {
    display: none;
  }
`

const GoOutWrap = styled.span<SearchStateProps>`
  @media (max-width: ${mediumLarge}px) {
    display: ${({ searchState }) =>
      searchState !== 'activeSearch' ? 'none' : 'block'};
  }
`

const LozengeSeparator = styled(Plus)`
  margin: 0 0.5rem;
  width: 1.25rem;
  height: 1.25rem;

  @media (max-width: ${mediumLarge}px) {
    margin: 0.7rem 0.7rem 0.7rem 0rem;
  }

  & path {
    fill: white;
  }
`

const MINIMUM_CHARACTERS_TO_CALL_FOR_SUGGESTIONS = 1
const MINIMUM_INPUT_WIDTH = 15

export const SearchInput: React.FC<SearchInputProps> = ({
  fixAsHeader,
  isAboutDisclaimerActive,
  autoSuggestion,
  suggestions,
  suggestionSpellChecks,
  searchState,
  onFocus,
  onBlur,
  onSelectedOptionsChange,
  onInputValueChange,
  setSearchState,
}) => {
  const intl = useIntl()
  const [areSuggestionVisible, setSuggestionsVisibility] = useState<boolean>(
    false
  )
  const [inputValue, setInputValue] = useState<string>('')
  const [debouncedInputValue, setDebouncedInputValue] = useDebounce<string>(
    '',
    200
  )
  const [selectedOptions, setSelectedOptions] = useState<Suggestion[]>([])
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0) // TODO: probably good to switch from index to IDs when API ready
  const [activeSelectedOptionIndex, setActiveSelectedOptionIndex] = useState<
    number | undefined
  >()
  const [inputWidth, setInputWidth] = useState<number>(MINIMUM_INPUT_WIDTH)
  const [autoSuggestionTerm, setAutoSuggestionTerm] = useState<
    string | undefined
  >(autoSuggestion)
  const isHomePage = useSelector(getIsHomePage)

  useEffect(() => setAutoSuggestionTerm(autoSuggestion), [autoSuggestion])

  useEffect(() => {
    if (suggestions?.length > 0) {
      setAutoSuggestionTerm(suggestions[0].label)
    }
  }, [suggestions])

  const inputRef = useRef<HTMLInputElement>(null)
  const hiddenInputValueRef = useRef<HTMLSpanElement>(null)
  const dispatch = useDispatch()
  const { search } = useSelector((state: State) => state.searchResultReducer)
  const { keywords } = useSelector(
    (state: State) => state.search as SearchState
  )
  const router = useRouter()

  useEffect(() => setSelectedOptions(search.filters), [
    search.filters as Filter[],
  ])
  useEffect(() => setInputAndDebounceValues(keywords), [keywords])

  const setInputAndDebounceValues = (value: string): void => {
    setInputValue(value)
    setDebouncedInputValue(value)
    onInputValueChange(value)
    dispatch(SetKeywords(value))
  }

  useEffect(() => {
    if (searchState === 'activeSearch') {
      setSuggestionsVisibility(
        debouncedInputValue.length >= MINIMUM_CHARACTERS_TO_CALL_FOR_SUGGESTIONS
      )
    }

    if (
      debouncedInputValue.length >= MINIMUM_CHARACTERS_TO_CALL_FOR_SUGGESTIONS
    ) {
      dispatch(
        loadSuggestions({
          keywords: debouncedInputValue,
          entities: selectedOptions as Entity[],
        })
      )
    } else {
      dispatch(SetSuggestions([]))
      setAutoSuggestionTerm('')
    }
  }, [debouncedInputValue])

  useEffect(() => {
    if (
      debouncedInputValue.length === 0 &&
      selectedOptions.length === 0 &&
      (searchState === 'activeSearch' || searchState === 'docked')
    ) {
      setAutoSuggestionTerm(intl.formatMessage(messages.searchPlaceholder))
    } else if (suggestions?.length === 0) {
      setAutoSuggestionTerm('')
    }
  }, [searchState, selectedOptions, debouncedInputValue])

  useEffect(() => {
    if (selectedOptions.length > 0) {
      dispatch(
        loadRecommendedFacets({
          keywords: debouncedInputValue,
          entities: selectedOptions as Entity[],
        })
      )
    }
    onSelectedOptionsChange(selectedOptions)
  }, [selectedOptions])

  useEffect(() => {
    const width = hiddenInputValueRef?.current?.clientWidth
    if (width !== undefined) {
      if (
        autoSuggestionTerm &&
        autoSuggestionTerm.length > 0 &&
        inputValue.length === 0
      ) {
        setInputWidth(0)
      }
      setInputWidth(width === 0 ? MINIMUM_INPUT_WIDTH : width + 1)
    } else {
      setInputWidth(0)
    }
  }, [inputValue, autoSuggestionTerm])

  const handleFocus = () => {
    onFocus()
    setSuggestionsVisibility(
      debouncedInputValue.length >= MINIMUM_CHARACTERS_TO_CALL_FOR_SUGGESTIONS
    )
  }

  const handleBlur = () => {
    setTimeout(() => {
      onBlur && onBlur()
    }, 100)
    setTimeout(() => {
      setSuggestionsVisibility(false)
    }, 400)
  }

  const handleKeyDown = (event: any) => {
    switch (event.key) {
      case 'Enter':
        if (!suggestions?.length) {
          const regex = new RegExp('^([A-b]{2,}[0-9]{1,10})$')
          if (regex.test(keywords)) {
            setSearchState('idle')
            setSuggestionsVisibility(false)
            dispatch(LoadSummaryError(200))
            inputRef.current?.blur()
            router.push(routes.product.overview(keywords.toString()).as)
            break
          }
          dispatch(loadSearch(keywords, search.filters, search.sorting, 0, 20))
          setSearchState('idle')
          setSuggestionsVisibility(false)
          dispatch(SetKeywords(keywords))
          break
        }
        break
      case 'Tab':
        event.preventDefault()
        if (suggestions?.length) {
          dispatch(AddFilter(suggestions[activeSuggestionIndex]))
          setInputAndDebounceValues('')
          setSuggestionsVisibility(false)
        }
        break
      case 'ArrowDown':
      case 'Down':
        if (activeSuggestionIndex + 1 < suggestions?.length) {
          const activeIndex = activeSuggestionIndex + 1
          setActiveSuggestionIndex(activeIndex)
          setAutoSuggestionTerm(suggestions[activeIndex].label)
        }
        break
      case 'ArrowUp':
      case 'Up':
        if (activeSuggestionIndex > 0) {
          setTimeout(() => {
            const activeIndex = activeSuggestionIndex - 1
            setActiveSuggestionIndex(activeIndex)
            setAutoSuggestionTerm(suggestions[activeIndex]?.label)
          })
        }
        break
      case 'Backspace':
        if (debouncedInputValue.length === 0) {
          if (activeSelectedOptionIndex === undefined) {
            if (selectedOptions.length) {
              setActiveSelectedOptionIndex(selectedOptions.length - 1)
            }
          } else if (activeSelectedOptionIndex >= 0) {
            setActiveSelectedOptionIndex(undefined)
            dispatch(
              RemoveFilter(
                [...selectedOptions].splice(activeSelectedOptionIndex, 1)[0]
              )
            )
          }
        }
        break
      case 'ArrowRight':
      case 'Right':
        if (debouncedInputValue.length === 0) {
          if (
            activeSelectedOptionIndex !== undefined &&
            activeSelectedOptionIndex < selectedOptions.length - 1
          ) {
            setActiveSelectedOptionIndex(activeSelectedOptionIndex + 1)
          } else {
            setActiveSelectedOptionIndex(undefined)
          }
        }
        break
    }
  }

  const handleChange = (event: any) => {
    setInputAndDebounceValues(event.target.value)
  }

  const placeholder = useMemo(
    () =>
      searchState === 'docked' ||
      searchState === 'activeSearch' ||
      isAboutDisclaimerActive ||
      selectedOptions.length > 0
        ? ''
        : intl.formatMessage(messages.searchPlaceholder),
    [intl, isAboutDisclaimerActive, searchState, selectedOptions.length]
  )

  return (
    <div
      className={classNames(styles.wrapper, {
        'sm:block': fixAsHeader && searchState !== 'activeSearch',
        'sm:hidden': isAboutDisclaimerActive,
      })}
    >
      <div
        className={classNames(styles.inputWrapper, {
          'pt-0': fixAsHeader,
        })}
      >
        <div
          className={classNames(
            styles.input,
            searchState === 'activeSearch'
              ? 'border-green45'
              : 'border-white border-opacity-40',
            (searchState === 'activeSearch' && isHomePage) || !isHomePage
              ? 'rounded-none border-l-0 border-r-0 border-t-0 py-1_5 px-1_2 sm:border-1_2 sm:rounded-full'
              : 'rounded-72px border-1_2'
          )}
          {...testTagProp('search-input')}
          onClickCapture={() => inputRef.current?.focus()}
        >
          <div className={styles.content}>
            <IconWrap searchState={searchState}>
              <Icon />{' '}
            </IconWrap>
            <GoOutWrap searchState={searchState}>
              <GoOut
                onClick={() => {
                  setSearchState('idle')
                  inputRef.current?.blur()
                }}
              />
            </GoOutWrap>
            <div className={styles.selectedOptionsWrapper}>
              <div className={styles.selectedOptions}>
                {selectedOptions.map((option, index) => (
                  <div className={styles.lozengeWrapper} key={index}>
                    <Lozenge
                      focused={index === activeSelectedOptionIndex}
                      variant="light"
                      onClick={() => setActiveSelectedOptionIndex(index)}
                    >
                      {option?.label in facetMessages
                        ? intl.formatMessage(facetMessages[option?.label])
                        : option?.label in facetItemMessages
                        ? intl.formatMessage(facetItemMessages[option?.label])
                        : option?.label}
                    </Lozenge>
                  </div>
                ))}
              </div>

              <span className={styles.lozengesSeparatorWrapper}>
                {selectedOptions.length > 0 &&
                  searchState === 'activeSearch' &&
                  activeSelectedOptionIndex === undefined && (
                    <LozengeSeparator />
                  )}
              </span>

              <div className={styles.inputAndSuggestionWrapper}>
                <input
                  className={classNames(styles.nativeInput, {
                    'w-full': searchState === 'idle',
                  })}
                  style={{
                    width: searchState !== 'idle' ? `${inputWidth}px` : '',
                  }}
                  type="input"
                  {...testTagProp('native-search-input')}
                  tabIndex={-1}
                  ref={inputRef}
                  spellCheck="false"
                  value={inputValue}
                  placeholder={placeholder}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                />
                <span
                  className={styles.hiddenInputValueSpan}
                  ref={hiddenInputValueRef}
                >
                  {inputValue}
                </span>
                <span className={styles.autoSuggestionTerm}>
                  <span>
                    {autoSuggestionTerm?.substr(debouncedInputValue.length)}
                  </span>
                </span>
                {suggestions?.length > 0 && (
                  <div
                    className={classNames(styles.suggestionsWrapper, {
                      block: areSuggestionVisible,
                      hidden: !areSuggestionVisible,
                    })}
                  >
                    <p
                      className={styles.suggestionsTitle}
                      {...testTagProp('suggestions-title')}
                    >
                      <FormattedMessage {...messages.searchSuggestions} />
                    </p>
                    <ul className={styles.suggestions}>
                      {suggestions.map((suggestion, index) => (
                        <li
                          className={styles.suggestionItem}
                          {...testTagProp('suggestion-item')}
                          key={index}
                        >
                          <Lozenge
                            variant="dark"
                            focused={activeSuggestionIndex === index}
                            onMouseEnter={() => {
                              setAutoSuggestionTerm(suggestions[index].label)
                              setActiveSuggestionIndex(index)
                            }}
                            onClick={() => {
                              dispatch(AddFilter(suggestions[index]))
                              setInputAndDebounceValues('')
                              setSuggestionsVisibility(false)
                            }}
                          >
                            <span className={styles.facetLabelUnmatched}>
                              {suggestion.label}
                            </span>
                          </Lozenge>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {suggestions?.length === 0 &&
                  suggestionSpellChecks?.length > 0 && (
                    <div
                      className={classNames(styles.suggestionsWrapper, {
                        block: areSuggestionVisible,
                        hidden: !areSuggestionVisible,
                      })}
                    >
                      <p className={styles.suggestionsTitle}>
                        <FormattedMessage {...messages.searchNoSuggestions} />
                      </p>
                      <div className={styles.separator}></div>
                      <p className={styles.suggestionsTitle}>
                        <FormattedMessage {...messages.searchDidYouMean} />
                      </p>
                      <ul className={styles.suggestions}>
                        {suggestionSpellChecks.map((suggestion, index) => (
                          <li className={styles.suggestionItem} key={index}>
                            <Lozenge variant="dark">
                              <span className={styles.facetLabelUnmatched}>
                                {suggestion.term}
                              </span>
                            </Lozenge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                {searchState === 'activeSearch' &&
                  (selectedOptions.length > 0 ||
                    debouncedInputValue.length > 0) && (
                    <button
                      className={styles.clearButton}
                      onClick={() => {
                        dispatch(ResetFilters())
                        dispatch(SetKeywords(''))
                      }}
                    >
                      <Cross className={styles.clearButtonSvg} />
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
        {((isHomePage && searchState === 'idle') || !fixAsHeader) && (
          <p className={styles.searchHint} {...testTagProp('search-hint')}>
            <FormattedMessage {...messages.searchHint} />
          </p>
        )}
      </div>
    </div>
  )
}
