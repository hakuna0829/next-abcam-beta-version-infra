import React, { useMemo, useState, useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'

import {
  FiltersContainer,
  FiltersWrapper,
  OuterAllFiltersButton,
} from './filters'
import { Facet } from '@browse/search/search.type'
import { FacetItem } from '@browse/search/facet-item/facet-item'
import messages from '@browse/messages'
import { grey20 } from '@browse/public'
import { getSearch } from '@browse/store/selectors/search-result-selectors'
import { AllFilters } from '@browse/search/all-filter/all-filter'
import { Sorting } from '@browse/search/sorting/sorting'
import { Drawer } from '@browse/components/drawer'
import { ReactComponent as Filter } from '@browse/public/icons/filter.svg'
import { State } from '@browse/store'
import { WindowResizeContext } from '@browse/window-resize/window-resize.context'
import styles from './filters-navigation.module.css'
import facetItemStyles from '@browse/search/facet-item/facet-item.module.css'
import { FiltersNavigationProps } from './filters-navigation.types'

const svgProps = {
  width: '16',
  height: '16',
  viewBox: '0 0 24 24',
  fill: grey20,
}

export const FiltersNavigation: React.FC<FiltersNavigationProps> = ({
  facets,
}) => {
  const [filteredFacets, setFilteredFacets] = useState(facets)
  const [showFiltersDrawer, setFiltersDrawerVisibility] = useState<boolean>(
    false
  )
  const dimensions = useContext(WindowResizeContext)
  const { width = 0 } = dimensions || {}

  const searchFilter = useSelector(getSearch)

  const [filterSizes, setFilterSizes] = useState<number[]>([])

  React.useEffect(() => {
    const sizes = facets.map((facet, index) => {
      const el = document.getElementById(`item-${index}`)
      return el ? el.offsetWidth : 0
    })

    setFilterSizes(sizes)
  }, [facets, searchFilter.filters])

  React.useEffect(() => {
    if (filterSizes.length === 0) {
      return
    }
    const containerWidth = width
    const allFilterButtonOffsetWidth = width

    let allFiltersWidth = 0
    const filteredFacetsByWidth = facets.filter((facet, index) => {
      allFiltersWidth = allFiltersWidth + filterSizes[index]

      return (
        containerWidth > allFiltersWidth + 24 + 48 + allFilterButtonOffsetWidth
      )
    })

    setFilteredFacets(filteredFacetsByWidth)
  }, [width])

  const facetsToRender =
    filteredFacets.length > 0 ? [...filteredFacets] : [...facets]

  const showAllFiltersButton = React.useMemo(
    () => filteredFacets.length < facets.length,
    [filteredFacets, facets]
  )

  const search = useSelector((state: State) => state.searchResultReducer.search)

  const filters = search?.filters

  const filterItemsCount = useMemo(() => {
    if (facetsToRender.length > 0) {
      return filters.filter((filter: any) =>
        facetsToRender.some((x) => x.type === filter.type)
      ).length
    }
    return 0
  }, [facetsToRender])

  return (
    <>
      <FiltersContainer id="container">
        <FiltersWrapper>
          {facetsToRender.map((facet: Facet, index: number) => (
            <FacetItem facet={facet} key={index} id={`item-${index}`} />
          ))}
        </FiltersWrapper>

        <OuterAllFiltersButton
          data-cy={'all-filter-button'}
          variant={'secondary'}
          rightIcon={<Filter {...svgProps} />}
          size={'small'}
          onClick={() => setFiltersDrawerVisibility(true)}
        >
          <>
            <FormattedMessage {...messages.searchResultsAllFilters} />
            <div className={facetItemStyles.countComponent}>
              {filterItemsCount}
            </div>
          </>
        </OuterAllFiltersButton>

        <div className={styles.mobileRelevanceButtonWrapper}>
          <Sorting />
        </div>
      </FiltersContainer>
      <Drawer
        header={
          <div className={styles.allFiltersDrawerHeaderWrapper}>
            <span>Filters</span>
          </div>
        }
        onClose={setFiltersDrawerVisibility}
        show={showFiltersDrawer}
        isCloseOnOutsideClick
        showOverlay
      >
        <AllFilters facets={facets} />
      </Drawer>
    </>
  )
}
