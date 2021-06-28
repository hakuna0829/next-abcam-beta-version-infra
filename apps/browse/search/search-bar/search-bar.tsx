import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Logo } from '@browse/components/logo'
import { State } from '@browse/store'
import { SearchState } from '@browse/store/reducers/search-reducer'
import { PreviousSearches } from '@browse/search/previous-searches/previous-searches'
import { SearchCategoriesResult } from '@browse/search/search-categories-result/search-categories-result'
import { AboutToggle } from '@browse/search/about-toggle/about-toggle'
import { SearchInput } from '@browse/search/search-input/search-input'
import { CloseActiveSearch } from '@browse/search/close-active-search/close-active-search'
import {
  AddFilter,
  ClearSearch,
  SetFilters,
  SetProductCode,
} from '@browse/store/actions/search-result-actions'
import { loadSearch } from '@browse/store/effects/search-result-effect'
import { SetKeywords } from '@browse/store/actions/search-actions'
import {
  getErrorCode,
  getKeywords,
  getSearch,
} from '@browse/store/selectors/search-result-selectors'
import {
  getIsHomePage,
  getSearchFixed,
} from '@browse/store/selectors/selectors'
import styles from '@browse/search/search-bar/search-bar.module.css'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import { Entity } from '@browse/search/search.type'
import { AboutDisclaimer } from '@browse/search/about-disclaimer/about-disclaimer'
import { SearchStateType } from '@browse/constants'
import { breakpoints } from '@browse/window-resize/breakpoints'

export const SearchBar: React.FC = () => {
  const isHomePage = useSelector(getIsHomePage)
  const fixAsHeader = useSelector(getSearchFixed)
  const [showAboutDisclaimer, setAboutDisclaimerVisibility] = useState<boolean>(
    false
  )
  const [searchState, setSearchState] = useState<SearchStateType>(
    fixAsHeader ? 'docked' : 'idle'
  )

  useEffect(() => {
    setSearchState(fixAsHeader ? 'docked' : 'idle')
  }, [fixAsHeader])

  const {
    facets,
    facetsHeader,
    suggestions,
    suggestionSpellChecks,
  } = useSelector((state: State) => state.search as SearchState)
  const [
    showPreviousSearches,
    setPreviousSearchesVisibility,
  ] = useState<boolean>()
  const [autoSuggestion, setAutoSuggestion] = useState<string | undefined>()
  const [inputValue, setInputValue] = useState<string>()
  const dispatch = useDispatch()
  const { result, filters } = useSelector(getSearch)

  const search = useSelector(getSearch)
  const keywords = useSelector(getKeywords)
  const errorCode = useSelector(getErrorCode)

  const router = useRouter()

  const wrapperHeight = useMemo(() => {
    if (fixAsHeader) {
      return 'auto'
    }

    if (showAboutDisclaimer) {
      return '7.5rem'
    }

    switch (searchState) {
      case 'idle':
        return isHomePage ? '100%' : '100vh'
      case 'docked':
      case 'activeSearch':
        return window.innerWidth >= breakpoints.medium ? '7.5rem' : ''
    }
  }, [searchState, fixAsHeader, isHomePage, showAboutDisclaimer])

  useEffect(() => {
    if (
      searchState === 'activeSearch' ||
      (searchState === 'idle' && showAboutDisclaimer)
    ) {
      setAboutDisclaimerVisibility(false)
    }
  }, [searchState])

  useEffect(() => {
    if (errorCode === 404) {
      dispatch(SetKeywords(keywords))
      /*  push(`/${locale}/no-results`);*/
    }
  }, [errorCode])

  useEffect(() => {
    const groupedFilters = search.filters.reduce(
      (groups: any, item: Entity) => {
        const { label, type } = item
        if (!groups[type]) {
          groups[type] = [label]
        } else {
          groups[type] = [...groups[type], label]
        }

        return groups
      },
      {}
    )

    const parameters = {
      sorting: search.sorting,
      ...(keywords && { keywords }),
    }

    const facets = Object.keys(groupedFilters).map(
      (key) => `facets.${key}=${groupedFilters[key].join('|')}`
    )

    const otherParams = Object.keys(parameters).map(
      (key) => `${key}=${parameters[key]}`
    )

    const qs = [...facets, ...otherParams].join('&')

    if (search.productCode) {
      dispatch(SetProductCode(''))
    }

    if (result) {
      const responseType = Object.keys(result)[0] as
        | 'entity'
        | 'categories'
        | 'products'
      switch (responseType) {
        case 'entity':
          /* router.push(`/en-gb/${result.entity.type}/${result.entity.label}`)*/
          window.location.href = `/en-gb/${result.entity.type}/${result.entity.label}`
          break

        case 'categories':
          if (result.categories?.header?.productCount === 0) {
            /*router.push(`/${locale}/no-results`);*/
          } else {
            router.push(`/en-gb/category?${qs}`)
          }
          break

        case 'products':
          if (result.products?.header?.productCount === 0) {
            /*  push(`/${locale}/no-results`);*/
          } else {
            router.push(`/en-gb/search?${qs}`)
          }
          break
      }
    }
  }, [result])

  return (
    <div
      className={classnames(
        styles.pageWrap,
        searchState === 'activeSearch' && styles.pageWrapActive,
        isHomePage && styles.isHomePage
      )}
    >
      <div
        className={classnames(styles.wrapper)}
        style={{ height: wrapperHeight }}
      >
        <div
          className={classnames(
            styles.mobilePanel,
            searchState === 'idle' && !isHomePage && styles.mobilePanelIdle,
            (searchState === 'activeSearch' ||
              !isHomePage ||
              (searchState === 'docked' && isHomePage)) &&
              styles.mobilePanelActive
          )}
        >
          <div className={styles.aboutToggleLeft}>
            <AboutToggleWrapper
              showAboutDisclaimer={showAboutDisclaimer}
              searchState={searchState}
              fixAsHeader={fixAsHeader}
              setAboutDisclaimerVisibility={setAboutDisclaimerVisibility}
              setSearchState={setSearchState}
              showLabel={false}
            />
          </div>
          <div className={styles.logoMobileWrap}>
            <Logo
              dataCy={'abcam-logo'}
              onClick={() => {
                /*    push(`/${locale}/`);*/
                dispatch(ClearSearch())
              }}
            />
          </div>
        </div>
        <div
          className={classnames(
            searchState === 'activeSearch'
              ? 'flex-0.1 sm:flex-0.2 lg:flex-0.5'
              : 'flex-0.3 sm:flex-0.5 lg:flex-1',
            searchState === 'activeSearch' ? 'pl-2%' : 'pl-5%',
            fixAsHeader || searchState === 'docked' || showAboutDisclaimer
              ? 'bg-grey20'
              : 'bg-transparent',
            !fixAsHeader &&
              !showAboutDisclaimer &&
              (searchState === 'activeSearch' || searchState === 'docked')
              ? 'hidden md:block'
              : 'hidden md:block'
          )}
        >
          <div
            className={classnames(
              styles.flexCenterVerticallyLeft,
              isHomePage ? 'h-auto sm:h-8rem' : 'h-auto sm:h-full'
            )}
          >
            <div className={styles.aboutToggleLeft}>
              <AboutToggleWrapper
                showAboutDisclaimer={showAboutDisclaimer}
                searchState={searchState}
                fixAsHeader={fixAsHeader}
                setAboutDisclaimerVisibility={setAboutDisclaimerVisibility}
                setSearchState={setSearchState}
                showLabel={false}
              />
            </div>
            <Logo
              dataCy={'abcam-logo'}
              onClick={() => {
                /* push(`/${locale}/`);*/
                dispatch(ClearSearch())
              }}
            />
          </div>
        </div>
        <div
          className={classnames(
            'middle',
            'z-searchMiddle',
            'pl-0 sm:pl-2',
            searchState === 'activeSearch'
              ? 'flex-1 sm:flex-0.5 md:flex-3'
              : 'flex-2 sm:flex-20 md:flex-4',
            fixAsHeader || searchState === 'docked' || showAboutDisclaimer
              ? 'bg-grey20'
              : 'bg-transparent',
            !fixAsHeader &&
              (searchState === 'activeSearch' || searchState === 'docked') &&
              styles.fullScreen
          )}
        >
          <SearchInput
            onInputValueChange={setInputValue}
            fixAsHeader={fixAsHeader}
            isAboutDisclaimerActive={showAboutDisclaimer}
            suggestions={suggestions}
            suggestionSpellChecks={suggestionSpellChecks}
            searchState={searchState}
            autoSuggestion={autoSuggestion}
            onFocus={() => setSearchState('activeSearch')}
            onSelectedOptionsChange={(selectedOptions) => {
              setPreviousSearchesVisibility(selectedOptions.length === 0)
            }}
            onBlur={() => undefined}
            setSearchState={setSearchState as (value: string) => void}
          />
        </div>
        <div
          className={classnames(
            'text-right',
            searchState === 'activeSearch'
              ? 'flex-0.1 sm:flex-0.2 lg:flex-0.3'
              : 'flex-0.3 sm:flex-0.5 lg:flex-0.7',
            searchState === 'activeSearch' ? 'pr-2%' : 'pr-5%',
            fixAsHeader || searchState === 'docked' || showAboutDisclaimer
              ? 'bg-grey20'
              : 'bg-transparent',
            !fixAsHeader &&
              !showAboutDisclaimer &&
              (searchState === 'activeSearch' || searchState === 'docked')
              ? 'hidden md:block'
              : 'hidden md:block'
          )}
        >
          <div
            className={classnames(
              styles.flexCenterVerticallyRight,
              isHomePage ? 'h-auto sm:h-8rem' : 'h-auto sm:h-full'
            )}
          >
            <div className={styles.aboutToggleRight}>
              <AboutToggleWrapper
                showAboutDisclaimer={showAboutDisclaimer}
                searchState={searchState}
                fixAsHeader={fixAsHeader}
                setAboutDisclaimerVisibility={setAboutDisclaimerVisibility}
                setSearchState={setSearchState}
                showLabel={true}
              />
            </div>
          </div>
        </div>
      </div>
      {showAboutDisclaimer ? (
        <AboutDisclaimer />
      ) : (
        <>
          {!showPreviousSearches &&
            searchState === 'activeSearch' &&
            facets.length > 0 && (
              <SearchCategoriesResult
                facets={facets}
                facetsHeader={facetsHeader}
                onValueEntered={(facetValue) =>
                  setAutoSuggestion(facetValue.label)
                }
                onValueLeft={() => setAutoSuggestion('')}
                onValueSelected={(facetValue, facetType) => {
                  dispatch(
                    AddFilter({ label: facetValue.label, type: facetType })
                  )
                }}
                onSearchExecuted={() => {
                  const value = inputValue ? inputValue : ''
                  dispatch(loadSearch(value, filters, 'relevance', 0, 20))
                  dispatch(SetKeywords(value))
                  setSearchState('idle')
                }}
              />
            )}

          {showPreviousSearches && searchState === 'activeSearch' && (
            <PreviousSearches
              onPreviousSearchSelected={(previousSearch) => {
                dispatch(SetKeywords(previousSearch.keywords))
                dispatch(SetFilters(previousSearch.facets))
                dispatch(
                  loadSearch(
                    previousSearch.keywords,
                    previousSearch.facets,
                    'relevance',
                    0,
                    20
                  )
                )
              }}
            />
          )}
        </>
      )}
    </div>
  )
}

interface AboutToggleWrapperProps {
  searchState: SearchStateType
  fixAsHeader: boolean | undefined
  showLabel: boolean
  showAboutDisclaimer: boolean
  setAboutDisclaimerVisibility: (showAboutDisclaimer: boolean) => void
  setSearchState: (searchState: SearchStateType) => void
}

const AboutToggleWrapper: React.FC<AboutToggleWrapperProps> = ({
  searchState,
  fixAsHeader,
  showLabel,
  showAboutDisclaimer,
  setAboutDisclaimerVisibility,
  setSearchState,
}) => {
  return (
    <>
      {showAboutDisclaimer ||
      searchState === 'idle' ||
      (fixAsHeader && searchState !== 'activeSearch') ? (
        <AboutToggle
          showLabel={showLabel}
          disclaimerIsShown={showAboutDisclaimer}
          onClick={() => {
            setAboutDisclaimerVisibility(!showAboutDisclaimer)
          }}
        />
      ) : (
        !showAboutDisclaimer &&
        (searchState === 'activeSearch' || searchState === 'docked') && (
          <CloseActiveSearch
            onClick={() => {
              setSearchState(fixAsHeader ? 'docked' : 'idle')
            }}
          />
        )
      )}
    </>
  )
}
