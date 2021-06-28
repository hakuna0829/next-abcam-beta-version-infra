import * as React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Button } from '@browse/components/button'
import { Lozenge } from '@browse/components/lozenge'
import messages, { facetItemMessages, facetMessages } from '@browse/messages'
import styles from '@browse/search/search-categories-result/search-categories-result.module.css'
import type { SearchCategoriesResultProps } from '@browse/search/search-categories-result/search-categories.type'
import { Tag, testTagProp } from '@browse/common/tagging'

export const SearchCategoriesResult: React.FC<SearchCategoriesResultProps> = ({
  facets,
  facetsHeader,
  onValueSelected,
  onValueEntered,
  onValueLeft,
  onSearchExecuted,
}) => {
  const intl = useIntl()

  const [activeItemIndex, setActiveItemIndex] = React.useState<
    [number, number] | undefined
  >()

  const handleShowResultsButton = () => {
    onSearchExecuted && onSearchExecuted()
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {facets.map((facet, index) => (
          <span className={styles.facetsColumn} key={index}>
            <p
              className={styles.facetsType}
              {...testTagProp(`${facet.type}-facets-label` as Tag)}
            >
              <FormattedMessage {...facetMessages[facet.type]} />
            </p>
            <ul className={styles.facetsList}>
              {facet.values?.map((value, index2) => (
                <li className={styles.facetItem} key={index2}>
                  <span className={styles.lozengeWrapper}>
                    <Lozenge
                      variant="dark"
                      focused={
                        !!activeItemIndex &&
                        index === activeItemIndex[0] &&
                        index2 === activeItemIndex[1]
                      }
                      onClick={() => {
                        onValueSelected && onValueSelected(value, facet.type)
                      }}
                      onMouseEnter={() => {
                        onValueEntered && onValueEntered(value, facet.type)
                      }}
                      onMouseLeave={() => {
                        onValueLeft && onValueLeft(value, facet.type)
                      }}
                    >
                      <span
                        className={styles.facetLabel}
                        {...testTagProp(`${facet.type}-facets-item` as Tag)}
                      >
                        {value.label in facetItemMessages
                          ? intl.formatMessage(facetItemMessages[value.label])
                          : value.label}
                      </span>
                      <span className={styles.facetCount}>{value.count}</span>
                    </Lozenge>
                  </span>
                </li>
              ))}
            </ul>
          </span>
        ))}
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          {...testTagProp('show-button')}
          variant="primary"
          size="large"
          onClick={handleShowResultsButton}
        >
          <FormattedMessage
            {...messages.searchShowResults}
            values={{ count: facetsHeader?.productCount }}
          />
        </Button>
      </div>
    </div>
  )
}
