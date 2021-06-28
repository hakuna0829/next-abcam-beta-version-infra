import styled, { css } from 'styled-components'
import BackgroundImagePath from '@browse/public/patterns/pattern-1-dark.svg'
export type SearchStateType = 'idle' | 'activeSearch' | 'docked'

export const zIndex = {
  nether: -1,
  feedbackPanel: 200,
  footer: 200,
  drawer: 300,
  search: 600,
  modal: 900,
  modelZElement: 901,
}

export const isAemUrl = false /*['/editor.html/content', '/content', '/conf/abcam'].some((partUrl) =>
    window.location.href.includes(partUrl),
);*/

export const defaultLanguage = 'en-gb'

interface WrapperProps {
  fixAsHeader: boolean | undefined
  searchState: SearchStateType
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;

  ${({ searchState }) => css`
    min-height: ${searchState == 'activeSearch' ? '' : '100vh'};
  `};

  ${({ fixAsHeader, searchState }) => {
    if (!fixAsHeader) {
      return css`
        height: ${searchState !== 'activeSearch' ? '100vh' : ''};

        @media (min-width: 768px) {
          height: 100vh;
        }

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        overflow: hidden;

        ${({ theme }) => css`
          background-color: ${theme.color.brandGrey};
          background-image: url('${BackgroundImagePath}');
          background-size: 5rem;
        `}
      `
    }
  }}
`
