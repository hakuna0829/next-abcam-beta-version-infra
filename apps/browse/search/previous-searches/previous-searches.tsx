import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { useEffect } from 'react'
import { ReactComponent as Magnifier } from '@browse/public/icons/magnifier.svg'
import { LoadPreviousSearches } from '@browse/store/actions/search-actions'
import { State } from '@browse/store'
import { SearchState } from '@browse/store/reducers/search-reducer'
import { Button } from '@browse/components/button'
import messages from '@browse/messages'
import { Lozenge } from '@browse/components/lozenge'
import styles from '@browse/search/previous-searches/previous-searches.module.css'
import { PreviousSearchesProps } from '@browse/search/previous-searches/previous-searches.type'
import { testTagProp } from '@browse/common/tagging'
import { getIsHomePage } from '@browse/store/selectors/selectors'

export const PreviousSearches: React.FC<PreviousSearchesProps> = (props) => {
  const dispatch = useDispatch()
  const { previousSearches } = useSelector(
    (state: State) => state.search as SearchState
  )
  const isHomePage = useSelector(getIsHomePage)

  useEffect(() => {
    dispatch(LoadPreviousSearches())
  }, [])

  return (
    <div
      className={styles.wrapper}
      style={{ height: isHomePage ? '100vh' : 'calc(100vh - 146px)' }}
    >
      {previousSearches.length > 0 && (
        <ul className={styles.searchTitle}>
          <p className={styles.title} {...testTagProp('previous-searches')}>
            <FormattedMessage {...messages.searchPreviousSearches} />
          </p>
          {previousSearches.map((search, index) => (
            <li className={styles.searchListItem} key={index}>
              {search.facets.map((facet, index) => (
                <span className={styles.lozengeWrapper} key={index}>
                  <Lozenge variant="dark">{facet.label}</Lozenge>
                </span>
              ))}
              <span className={styles.searchKeywords}>{search.keywords}</span>
              <Button
                background="dark"
                size="medium"
                variant="tertiaryFilled"
                icon={<Magnifier />}
                onClick={() => props.onPreviousSearchSelected(search)}
              ></Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
