import styled, { css } from 'styled-components'
import { brandGrey, white } from '@browse/public'

export const ProductIcon = styled.span`
  color: '#a4207f';
  font-size: 1.3rem;
  ${({ theme }) => css`
    margin-right: ${theme.size.spacing[2]};
  `}
  svg path {
    fill: #a4207f;
  }
`

export const ProductCode = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.size.spacing[4]};
    color: ${brandGrey};
    letter-spacing: 0.5px;
  `}
`

export const ProductDescription = styled.div`
  ${({ theme }) => css`
    font-size: 1.313rem;
    color: ${theme.color.textGreyDark};
    margin-top: 0.313rem;
  `}
`

export const ProductInfoButton = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.size.spacing[3]};
    color: ${white};
    padding-top: ${theme.size.spacing[4]};
  `}
  letter-spacing: 0.5px;
`
