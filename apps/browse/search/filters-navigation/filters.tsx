import styled from 'styled-components'

import { Button } from '@browse/components/button'
import { spacing4, layout1 } from '@browse/public'

import { mediumLarge, medium } from '@browse/breakpoints'

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: ${mediumLarge}px) {
    margin: ${spacing4} 6.25% 0;
    justify-content: space-between;
  }

  @media (min-width: ${mediumLarge}px) {
    margin: ${spacing4} 2.5% 0;
  }
`

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: rgba(39, 63, 63, 0.05);
  border-radius: ${layout1};
  margin: 0 3rem 0 1.5rem;
  @media (max-width: ${medium}px) {
    display: none;
  }
  div button:first-child {
    border: none;
    background-color: transparent !important;
  }
  white-space: nowrap;
`

export const OuterAllFiltersButton = styled(Button)`
  visibility: hidden;
  position: absolute;

  @media (max-width: ${medium}px) {
    position: relative;
    visibility: visible;
  }
`
