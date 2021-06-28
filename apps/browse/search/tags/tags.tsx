import styled, { css } from 'styled-components'
import { mediumLarge } from '@browse/breakpoints'

// const tagColorStyles = {
//     green: css`
//         color: ${({ theme }) => theme.color.interactiveGreenActive};
//         background-color: ${({ theme }) => theme.color.interactiveGreenTransparentActive};
//     `,
//     blue: css`
//         color: ${({ theme }) => theme.color.interactiveBlueDefault};
//         background-color: ${({ theme }) => theme.color.interactiveBlueTransparentActive};
//     `,
//     grey: css`
//         color: ${({ theme }) => theme.color.textGreyDark};
//         background-color: ${({ theme }) => theme.color.backgroundLightbox};
//     `,
// };

export const Tag = styled.span`
  margin-left: 0.375rem;
  display: inline-block;
  padding: 0.25rem;
  font-family: 'Lubalin-Demi';
  border-radius: 3px;
  font-size: 0.5rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.5px;
  text-align: left;

  @media (max-width: ${mediumLarge}px) {
    font-size: 0.5rem;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: 0.5px;
    text-align: left;
  }
`
