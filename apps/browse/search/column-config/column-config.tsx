import React, { SyntheticEvent } from 'react'
import { Tag } from '@browse/search/tags/tags'
import { FormattedMessage } from 'react-intl'
import messages from '@browse/messages'
import { Button } from '@browse/components/button'
import { TagCodes } from '@browse/search/search.type'
import styles from './column-config.module.css'
import {
  ImagesInfoProps,
  PublicationsInfoProps,
  SelectProductInterface,
  SetCurrentViewInterface,
  RowProps,
} from './column-config.types'

const getColorByTag = (tagCode: TagCodes) => {
  switch (tagCode) {
    case 'RABMAB':
      return 'blue'
    case 'RECOMBINANT':
      return 'grey'
    default:
      return 'grey'
  }
}

export const useColumns = (
  selectProduct: SelectProductInterface,
  setCurrentView: SetCurrentViewInterface
) => {
  const columns = [
    {
      name: 'productName',
      label: '',

      render: ({
        row: { productCode, productName, productTags },
      }: {
        row: RowProps
      }) => {
        return (
          <div className={styles.productFirstColumn}>
            <div className={styles.productFirstColumnFirstRow}>
              <div className={styles.productCode}>{productCode}</div>

              {productTags &&
                productTags.map((tag) => (
                  <Tag
                    key={tag.tagCode}
                    color={getColorByTag(tag.tagCode as TagCodes)}
                  >
                    {tag.tagCode}
                  </Tag>
                ))}
            </div>

            <div
              className={styles.productFirstColumnSecondRow}
              data-cy={'product-name'}
            >
              {productName}
            </div>
          </div>
        )
      },
      headerRender: () => (
        <div className={styles.productFirstColumnHeader}> </div>
      ),
    },
    {
      name: 'imageCount',
      headerRender: () => (
        <div className={styles.productSecondColumnHeader}>
          <FormattedMessage {...messages.searchResultsImages} />
        </div>
      ),
      render: ({ row: { imageCount, productCode } }: { row: RowProps }) => (
        <ImagesInfo
          imageCount={imageCount}
          productCode={productCode}
          selectProduct={selectProduct}
          setCurrentView={setCurrentView}
          filters={[]}
        />
      ),
    },
    {
      name: 'publicationCount',
      headerRender: () => (
        <div className={styles.productThirdColumnHeader}>
          <FormattedMessage {...messages.searchResultsPublications} />
        </div>
      ),
      render: ({
        row: { publicationCount, productCode },
      }: {
        row: RowProps
      }) => (
        <PublicationsInfo
          publicationCount={publicationCount}
          productCode={productCode}
          selectProduct={selectProduct}
          setCurrentView={setCurrentView}
        />
      ),
    },

    {
      name: 'applications',
      render: ({ row: { applications } }: { row: RowProps }) => (
        <div className={styles.productForthColumn}>
          <div className={styles.mobileViewColumnTitle}>
            <FormattedMessage {...messages.searchResultsApplications} />
          </div>
          <div className={styles.mobileViewColumnText}>{applications}</div>
        </div>
      ),
      headerRender: () => (
        <div className={styles.productForthColumnHeader}>
          <FormattedMessage {...messages.searchResultsApplications} />
        </div>
      ),
    },
    {
      name: 'reactiveTaxa',
      render: ({ row: { reactiveTaxa } }: { row: RowProps }) => (
        <div className={styles.productFifthColumn}>
          <div className={styles.mobileViewColumnTitle}>
            <FormattedMessage {...messages.searchResultsSpecies} />
          </div>
          <div className={styles.mobileViewColumnText}>{reactiveTaxa}</div>
        </div>
      ),
      headerRender: () => (
        <div className={styles.productFifthColumnHeader}>
          <FormattedMessage {...messages.searchResultsSpecies} />
        </div>
      ),
    },
    {
      name: 'conjugation',
      label: (
        <div className={styles.productSixColumnHeader}>
          <FormattedMessage {...messages.searchResultsConjugation} />
        </div>
      ),
      render: ({ row: { conjugation } }: { row: RowProps }) => (
        <div className={styles.productSixColumn}>
          <div className={styles.mobileViewColumnTitle}>
            <FormattedMessage {...messages.searchResultsConjugation} />
          </div>
          <div className={styles.mobileViewColumnText}>{conjugation.label}</div>
        </div>
      ),
    },
    { name: 'productCode', hidden: true },
    { name: 'productTags', hidden: true },
  ]

  return [columns]
}

const ImagesInfo: React.FC<ImagesInfoProps> = ({
  imageCount,
  productCode,
  selectProduct,
  setCurrentView,
}) => {
  const handleClick = (e: SyntheticEvent) => {
    selectProduct(productCode, [])

    e.stopPropagation()
    setCurrentView('quickview')
  }
  const Number = () => <span>{imageCount}</span>
  return (
    <div className={styles.productSecondColumn}>
      <Button
        size={'large'}
        variant={'tertiaryFilled'}
        icon={<Number />}
        onClick={handleClick}
      ></Button>
    </div>
  )
}

const PublicationsInfo: React.FC<PublicationsInfoProps> = ({
  publicationCount,
  productCode,
  selectProduct,
  setCurrentView,
}) => {
  const handleClick = (e: SyntheticEvent) => {
    selectProduct(productCode, [])
    e.stopPropagation()
    setCurrentView('publications')
  }
  const Number = () => <span>{publicationCount}</span>
  return (
    <div className={styles.productThirdColumn}>
      <Button
        size={'large'}
        variant={'tertiaryFilled'}
        icon={<Number />}
        onClick={handleClick}
      ></Button>
    </div>
  )
}

export const Skeleton = () => {
  return (
    <>
      <div className={styles.productFirstColumn}>
        <div className={styles.productFirstColumnFirstRow}>
          <div className={styles.productCode}>
            <div className={styles.placeholder}>test</div>
          </div>
        </div>

        <div className={styles.productFirstColumnSecondRow}>
          <div className={styles.placeholder}>test</div>
        </div>
      </div>
      <div className={styles.productSecondColumn}>
        <div className={styles.numberCircle}>
          <span></span>
        </div>
      </div>
      <div className={styles.productThirdColumn}>
        <div className={styles.numberCircle}>
          <span></span>
        </div>
      </div>
      <div className={styles.productForthColumn}>
        <div className={styles.mobileViewColumnTitle}>
          <FormattedMessage {...messages.searchResultsApplications} />
        </div>
        <div className={styles.placeholder}>application</div>
      </div>
      <div className={styles.productFifthColumn}>
        <div className={styles.mobileViewColumnTitle}>
          <FormattedMessage {...messages.searchResultsSpecies} />
        </div>
        <div className={styles.placeholder}>reactiveTaxa</div>
      </div>
      <div className={styles.productSixColumn}>
        <div className={styles.mobileViewColumnTitle}>
          <FormattedMessage {...messages.searchResultsConjugation} />
        </div>
        <div className={styles.placeholder}>test</div>
      </div>
    </>
  )
}
