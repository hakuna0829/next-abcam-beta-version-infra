import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  SyntheticEvent,
} from 'react'
import { useTable } from 'react-final-table'
import InfiniteScroll from 'react-infinite-scroller'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import styles from './result-table.module.css'
import { Button } from '@browse/components/button'
import { grey20 } from '@browse/public'
import {
  Skeleton,
  useColumns,
} from '@browse/search/column-config/column-config'
import { ReactComponent as Up } from '@browse/public/icons/chevron-up.svg'
import { ReactComponent as Picture } from '@browse/public/icons/picture.svg'
import { ReactComponent as Book } from '@browse/public/icons/book.svg'
import {
  SetProductCode,
  ClearSearch,
} from '@browse/store/actions/search-result-actions'
import {
  SetApplicationId,
  SetSpecieId,
} from '@browse/store/actions/product-actions'
import DrawerHeader from '@browse/search/produt-detail-drawer/DrawerHeader'
import { Drawer } from '@browse/components/drawer'
import { mediumLarge } from '@browse/breakpoints'
import { Filter } from '@browse/search/search.type'
import { getProductCode } from '@browse/store/selectors/search-result-selectors'
import { loadSearch } from '@browse/search/search.effects'
import { ResultTableProps } from './result-table.types'
import QuickViewTab from '@browse/search/produt-detail-drawer/QuickViewTab'
import PublicationsTab from '@browse/search/produt-detail-drawer/PublicationsTab'

const SvgProps = {
  width: '16',
  height: '16',
  viewBox: '0 0 24 24',
  fill: grey20,
}

export const ResultTable: React.FC<ResultTableProps> = ({
  sorting,
  keywords,
  productItemsCount,
  productItems,
  filters,
  setProductItems,
}) => {
  const [currentView, setCurrentView] = useState('none')
  const dispatch = useDispatch()

  const productCode = useSelector(getProductCode)

  const applicationFilters = useMemo(
    () =>
      filters
        ?.filter((item) => item.type === 'application')
        .map((item) => item.label),
    [filters]
  )

  const reactiveTaxaFilters = useMemo(
    () =>
      filters
        ?.filter((item) => item.type === 'reactiveTaxon')
        .map((item) => item.label),
    [filters]
  )

  const preparedProductItems = useMemo(() => {
    if (productItems) {
      return productItems.map((item) => ({
        ...item,
        applications: Array.isArray(item.applications)
          ? item.applications.map((application, index) => (
              <React.Fragment key={index}>
                <span
                  className={
                    applicationFilters.includes(application)
                      ? styles.rowSelected
                      : ''
                  }
                  key={index}
                >
                  {application}
                </span>
                {index < item.applications.length - 1 && ', '}
              </React.Fragment>
            ))
          : '',
        ...(Array.isArray(item.reactiveTaxa)
          ? {
              reactiveTaxa: item.reactiveTaxa.map((reactiveItem, index) => (
                <React.Fragment key={index}>
                  <span
                    className={
                      reactiveTaxaFilters.includes(reactiveItem)
                        ? styles.rowSelected
                        : ''
                    }
                    key={index}
                  >
                    {reactiveItem}
                  </span>
                  {index < item.reactiveTaxa.length - 1 && ', '}
                </React.Fragment>
              )),
            }
          : { reactiveTaxa: '' }),
      }))
    }

    return []
  }, [productItems])

  const selectProduct = (productCode: string, filters: Filter[]) => {
    dispatch(SetProductCode(productCode))

    const applicationFilters = filters.filter(
      (item: Filter) => item.type === 'application'
    )

    if (applicationFilters.length === 1) {
      dispatch(SetApplicationId(applicationFilters[0].label))
    } else {
      dispatch(SetApplicationId(undefined))
    }

    dispatch(SetSpecieId(undefined))
  }

  const [columns] = useColumns(selectProduct, setCurrentView)

  const memoColumns = useMemo(() => columns, [])
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { headers, rows } = useTable(memoColumns, preparedProductItems)

  const [topButtonVisible, setTopButtonVisible] = useState<boolean>(false)
  const [isSticked, setIsSticked] = useState<boolean>(false)

  useEffect(() => {
    window.onscroll = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        setTopButtonVisible(true)
      } else {
        setTopButtonVisible(false)
      }
    }
  })

  const handleTopClick = () => {
    window.scrollTo(0, 0)
  }

  React.useEffect(() => {
    const header = document.getElementById('tableHeader')
    const sticky = header ? header.offsetTop : 0
    const scrollCallback = () => {
      if (window.pageYOffset > sticky) {
        setIsSticked(true)
      } else {
        setIsSticked(false)
      }
    }
    window.addEventListener('scroll', scrollCallback)
    return () => {
      window.removeEventListener('scroll', scrollCallback)
    }
  }, [])

  const currentProductItemsCount = preparedProductItems.length

  const goToPdp = (productCode: string) => {
    dispatch(ClearSearch())
  }

  const ref = useRef(null)
  return (
    <>
      <div className={styles.productGrid} ref={ref}>
        <div
          className={classNames(
            styles.productGridRowHeader,
            isSticked && styles.isSticked
          )}
          id="tableHeader"
        >
          {headers.map((header, index) => {
            return (
              <React.Fragment key={index}>{header.render()}</React.Fragment>
            )
          })}
        </div>
        <InfiniteScroll
          pageStart={1}
          loadMore={async () => {
            const [search] = await Promise.all([
              loadSearch(
                keywords,
                filters,
                sorting,
                currentProductItemsCount,
                20
              ),
            ])

            setProductItems([...productItems, ...search?.products?.items])
          }}
          hasMore={
            currentProductItemsCount < productItemsCount &&
            currentProductItemsCount !== 0
          }
          loader={
            <div
              className={styles.productGridRow}
              key={1}
              data-cy={'product-grid-row'}
            >
              <Skeleton />
            </div>
          }
        >
          {rows.map((row, idx) => {
            const handleRowClick = () => {
              selectProduct(row?.original?.productCode, filters)
              if (window.innerWidth < +mediumLarge) {
                goToPdp(row?.original?.productCode)
                return
              }
              setCurrentView('quickview')
            }

            const handleQuickViewClick = (e: SyntheticEvent) => {
              selectProduct(row?.original?.productCode, filters)
              e.stopPropagation()
              if (window.innerWidth < +mediumLarge) {
                goToPdp(row?.original?.productCode)
                return
              }
              setCurrentView('quickview')
            }

            const handlePublicationsViewClick = (e: SyntheticEvent) => {
              selectProduct(row?.original?.productCode, filters)
              e.stopPropagation()
              if (window.innerWidth < +mediumLarge) {
                goToPdp(row?.original?.productCode)
                return
              }
              setCurrentView('publications')
            }

            return (
              <React.Fragment key={idx}>
                <div
                  className={classNames(
                    styles.productGridRow,
                    row.original.productCode === productCode &&
                      styles.isSelected
                  )}
                  data-cy={'product-grid-row'}
                  onClick={handleRowClick}
                  key={idx}
                >
                  {row.cells.map((cell, index) => {
                    return (
                      <React.Fragment key={index}>
                        {cell.render()}
                      </React.Fragment>
                    )
                  })}
                  <div className={styles.mobileView}>
                    <Button
                      variant="tertiaryFilled"
                      size="small"
                      leftIcon={<Picture {...SvgProps} />}
                      background={'light'}
                      onClick={handleQuickViewClick}
                    >
                      {row.original.imageCount}{' '}
                    </Button>
                    <Button
                      variant="tertiaryFilled"
                      size="small"
                      leftIcon={<Book {...SvgProps} />}
                      background={'light'}
                      onClick={handlePublicationsViewClick}
                    >
                      {row.original.publicationCount}{' '}
                    </Button>
                  </div>
                </div>
              </React.Fragment>
            )
          })}
        </InfiniteScroll>
        <div
          className={classNames(
            styles.buttonTop,
            topButtonVisible && styles.isVisible
          )}
        >
          <Button
            variant="secondary"
            size="medium"
            rightIcon={<Up />}
            background={'light'}
            onClick={handleTopClick}
          >
            Top
          </Button>
        </div>
      </div>

      <Drawer
        headerHeight={''}
        header={
          <DrawerHeader
            productItems={productItems}
            productCode={productCode}
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        }
        onClose={(close, event) => {
          if (ref.current !== null) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (!ref.current.contains(event.target)) {
              setCurrentView('none')
              dispatch(SetProductCode(undefined))
            }
          }
        }}
        show={currentView !== 'none'}
        isCloseOnOutsideClick
      >
        {currentView === 'quickview' && <QuickViewTab />}
        {currentView === 'publications' && <PublicationsTab />}
      </Drawer>
    </>
  )
}
