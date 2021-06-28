import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'
import { grey20, grey60, layout1 } from '@browse/public'
import { Flex } from '@browse/components/flex'

import { useDispatch, useSelector } from 'react-redux'
import {
  loadImages,
  loadKeyfacts,
  loadReactivity,
} from '@browse/product/product.effects'
import {
  getKeyFacts,
  getImages,
  getReactivityApplications,
  getSelectedAppId,
  getSelectedSpecie,
  imagesLoading,
  reactivityLoading,
  keyFactsLoading,
} from '@browse/store/selectors/product-selectors'
import {
  LoadKeyFactsSuccess,
  SetApplicationId,
  LoadReactivitySuccess,
  LoadImagesSuccess,
} from '@browse/store/actions/product-actions'
import { getSearch } from '@browse/store/selectors/search-result-selectors'
import QuickViewImagesLoader from '../loaders/QuickViewImagesLoader'
import { ImageSlider } from '@browse/components/image-overlay/components/image-slider/image-slider'

const BackGroundLine = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.color.backgroundGrey};
  `}
`

const DrawerContentWrap = styled.div`
  padding-left: 32px;
  padding-right: 32px;
  padding-top: ${layout1};
`

export const AnyApplicationBtn = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.size.spacing[3]};
    padding-left: ${theme.size.spacing[4]};
    padding-top: ${theme.size.spacing[4]};
  `}
  letter-spacing: 0.5px;
`

interface TableRowProps {
  label: string
  description: string
  detail: string
}

export const TableColumnWrap = styled.div<TableRowProps>`
  display: flex;
  flex-basis: 0;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const QuickViewImagesWrapper = styled.div``

export const ColumnLabel = styled.span`
  letter-spacing: 0.5px;

  ${({ theme }) => css`
    font-size: ${theme.size.spacing[3]};
    color: ${grey60};
  `}
`

export const ColumnDesc = styled.span`
  color: ${grey20};
  letter-spacing: 0.5px;

  ${({ theme }) => css`
    font-size: ${theme.size.spacing[3]};
  `}
`

export const ColumnDetail = styled(ColumnDesc)`
  ${({ theme }) => css`
    font-size: ${theme.size.spacing[3]};
  `}
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: 0.5px;
  word-break: break-word;
`

export const ImagesWrap = styled.div`
  width: 558px;
  height: 248px;
  background-color: var(--text-white-text);
  padding-top: 3rem;
`

export const TableColumn: React.FC<TableRowProps> = (props: TableRowProps) => {
  return (
    <TableColumnWrap {...props}>
      <ColumnLabel>{props.label}</ColumnLabel>
      <ColumnDesc>{props.description}</ColumnDesc>
      <ColumnDetail
        dangerouslySetInnerHTML={{ __html: props.detail }}
      ></ColumnDetail>
    </TableColumnWrap>
  )
}

export const QuickViewTab: React.FC = () => {
  const dispatch = useDispatch()
  const [current, setCurrent] = React.useState(0)

  const search = useSelector(getSearch)
  const applicationId = useSelector(getSelectedAppId)
  const selectedSpecie = useSelector(getSelectedSpecie)
  const code = search.productCode

  const isImagesLoading = useSelector(imagesLoading)
  const isReactivityLoading = useSelector(reactivityLoading)
  const isKeyFactsLoading = useSelector(keyFactsLoading)

  React.useEffect(() => {
    async function getKeyfacts() {
      await loadKeyfacts(code).then((res) => {
        dispatch(LoadKeyFactsSuccess(res))
      })
    }

    async function getReactivity() {
      await loadReactivity(code).then((res) => {
        dispatch(LoadReactivitySuccess(res))
      })
    }

    if (code) {
      getKeyfacts()
      getReactivity()
    }
  }, [code, dispatch])

  React.useEffect(() => {
    async function getImages() {
      await loadImages(code, applicationId, selectedSpecie).then((res) => {
        dispatch(LoadImagesSuccess({ images: res }))
      })
    }
    if (code) {
      getImages()
    }
  }, [code, applicationId, selectedSpecie, dispatch])

  const keyFacts = useSelector(getKeyFacts)
  const images = useSelector(getImages)

  const reactivityApplications = useSelector(getReactivityApplications)

  const handleChangeApplication = (item: any) => {
    const app = reactivityApplications.find(
      (validatedApplication) =>
        validatedApplication.applicationId === item.applicationId
    )
    if (app && app.applicationId) {
      dispatch(SetApplicationId(app.applicationId))
    }
  }

  const applications = useSelector(getReactivityApplications)

  const reactiveSpecies = useMemo(
    () =>
      applicationId
        ? applications
            .find(
              (validatedApplication) =>
                validatedApplication.applicationId === applicationId
            )
            ?.reactivity.filter(({ guaranteed }) => guaranteed)
            .map(({ taxon }) => taxon)
        : applications
            .map(({ reactivity }) =>
              reactivity
                .filter(({ guaranteed }) => guaranteed)
                .map(({ taxon }) => taxon)
            )
            .flat(),
    [applicationId, applications]
  )

  const uniqReactiveSpecies = [...new Set(reactiveSpecies)]

  return (
    <>
      <BackGroundLine>
        <DrawerContentWrap>
          {(isImagesLoading || isReactivityLoading) && (
            <ImagesWrap>
              <QuickViewImagesLoader />
            </ImagesWrap>
          )}

          {!isImagesLoading && !isReactivityLoading && (
            <QuickViewImagesWrapper>
              <ImageSlider
                imagesDataOpt={images}
                setCurrent={setCurrent}
                hideOverlay={false}
                current={current}
                imageWidth={180}
                imageHeight={180}
              />
            </QuickViewImagesWrapper>
          )}

          {!isReactivityLoading && (
            <Flex direction={'row'}>
              <TableColumn
                label={'Applications'}
                description={applications
                  .map(({ applicationId }) => applicationId)
                  .join(', ')}
                detail={''}
              />

              <TableColumn
                label={'Reactive species'}
                description={
                  uniqReactiveSpecies && uniqReactiveSpecies.join(', ')
                }
                detail={''}
              />
            </Flex>
          )}
        </DrawerContentWrap>
      </BackGroundLine>

      {!isKeyFactsLoading && (
        <DrawerContentWrap>
          <Flex direction={'row'}>
            <TableColumn
              label={'Isotype'}
              description={keyFacts?.isoType}
              detail={''}
            />

            <TableColumn
              label={'Host species'}
              description={keyFacts?.hostTaxa}
              detail={''}
            />
          </Flex>

          <Flex direction={'row'}>
            <TableColumn
              label={'Immunogen'}
              description={keyFacts?.immunogen?.description}
              detail={keyFacts?.immunogen?.description}
            />
          </Flex>
        </DrawerContentWrap>
      )}
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default QuickViewTab
