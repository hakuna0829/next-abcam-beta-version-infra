import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { layout1, white } from '@browse/public'
import { Flex } from '@browse/components/flex'
import { ReactComponent as Out } from '@browse/public/icons/out.svg'
import {
  getPublications,
  getSelectedAppId,
  getSelectedSpecie,
  publicationsLoading,
} from '@browse/store/selectors/product-selectors'
import { ProductDropdowns } from '@browse/components/product-dropdowns/product-dropdowns'
import QuickViewPublicationsLoader from '@browse/search/loaders/QuickViewPublicationsLoader'
import { getSearch } from '@browse/store/selectors/search-result-selectors'
import {
  loadImages,
  loadPublications,
  loadReactivity,
} from '@browse/product/product.effects'
import {
  LoadImagesSuccess,
  LoadPublicationsSuccess,
  LoadReactivitySuccess,
} from '@browse/store/actions/product-actions'

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

const PublicationsCount = styled.span`
  font-size: 1.313rem;
  font-weight: 'normal';
  line-height: 1.29;
  color: var(--text-grey-dark);
  padding-top: 1.37rem;
  padding-bottom: 1.88rem;

  ${({ theme }) => css`
    color: ${theme.color.backgroundGreyDark};
  `}
`

const PublicationCardWrap = styled.div`
  margin-bottom: 1rem;
  padding: 1.13rem 1.688rem;
  height: 9.313rem;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 3px 8px 0 rgba(39, 63, 63, 0.11);
  background-color: ${white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1.188rem;
`

const CardLabelWrap = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 'normal';
  line-height: 1.5;
  letter-spacing: 0.5px;
  ${({ theme }) => css`
    color: ${theme.color.brandGrey};
  `}
`

const CardDescription = styled(CardLabelWrap)`
  ${({ theme }) => css`
    color: ${theme.color.backgroundGreyDark};
  `}
`

const OutIcon = styled(Out)`
  ${({ theme }) => css`
    path {
      fill: ${theme.color.textGreyDark};
      transform: scale(0.7);
    }
    margin-left: ${theme.size.spacing[2]};
  `}
`

const OutIconWrap = styled(OutIcon)`
  cursor: pointer;
`

export const PublicationsTab: React.FC = () => {
  const dispatch = useDispatch()
  const publications = useSelector(getPublications)
  const isPublicationsLoading = useSelector(publicationsLoading)

  const search = useSelector(getSearch)
  const applicationId = useSelector(getSelectedAppId)
  const selectedSpecie = useSelector(getSelectedSpecie)
  const code = search.productCode

  useEffect(() => {
    async function getReactivity() {
      await loadReactivity(code).then((res) => {
        dispatch(LoadReactivitySuccess(res))
      })
    }

    async function getPublications() {
      await loadPublications(
        search.productCode,
        applicationId,
        selectedSpecie
      ).then((res) => {
        dispatch(LoadPublicationsSuccess(res))
      })
    }
    if (code) {
      getPublications()
      getReactivity()
    }
  }, [dispatch, search.productCode, applicationId, selectedSpecie])

  return (
    <BackGroundLine>
      <DrawerContentWrap>
        {isPublicationsLoading && <QuickViewPublicationsLoader />}
        {!isPublicationsLoading && (
          <>
            <ProductDropdowns />
            <Flex direction={'column'}>
              <PublicationsCount>
                {publications && publications.length} Publications
              </PublicationsCount>
              {publications?.map((publication, key) => {
                return (
                  <PublicationCardWrap>
                    <CardLabelWrap>
                      <span>
                        {publication.journal} {publication.volume}:
                        {publication.pages}
                      </span>
                      <span>{publication.year}</span>
                    </CardLabelWrap>
                    <CardDescription>{publication.title}</CardDescription>

                    <CardLabelWrap>
                      <span>{publication.authors}.</span>
                      <Flex direction={'row'}>
                        <span>PubMed {publication.pubmedid}</span>
                        <OutIconWrap
                          onClick={() =>
                            window.open(
                              `https://www.ncbi.nlm.nih.gov/pubmed/${publication.pubmedid}?dopt=Abstract`
                            )
                          }
                        />
                      </Flex>
                    </CardLabelWrap>
                  </PublicationCardWrap>
                )
              })}
            </Flex>
          </>
        )}
      </DrawerContentWrap>
    </BackGroundLine>
  )
}

export default PublicationsTab
