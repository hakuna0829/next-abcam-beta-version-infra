import styled from 'styled-components'
import { mediumLarge } from '@browse/breakpoints'

export const Wrapper = styled.div`
  display: flex;
  position: relative;

  @media (max-width: ${mediumLarge}px) {
    flex-direction: column;
  }
`

export const FacetsColumn = styled.span`
  flex: 1;
  margin: 3rem 5%;
  max-width: 100%;

  @media (max-width: ${mediumLarge}px) {
    margin: 1.5rem 2rem 0 2rem;
  }
`

export const FacetItem = styled.li`
  @media (max-width: 768px) {
    display: inline-block;
    margin-right: 0.5rem;
  }
`

export const FacetLabel = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
