import styled from 'styled-components'

import { ReactComponent as LogoIcon } from '@browse/public/icons/logo-abcam-beta-darkbg.svg'
import { Tag, testTagProp } from '@browse/common/tagging'

const Wrapper = styled.div<{ bigLogo: boolean }>`
  display: flex;
  width: 100%;

  svg {
    height: 1.5rem;
    /* width: 100%;
    min-width: 50px; */
  }

  svg path {
    fill: ${({ theme }) => theme.color.textWhite};
  }

  /* @media (max-width: 680px) {
    padding-left: 50px;
  } */
  cursor: pointer;
`

interface LogoProps {
  onClick: (event: React.MouseEvent) => void
  dataCy: Tag
}

export const Logo: React.FC<LogoProps> = ({ onClick, dataCy }) => {
  return (
    <Wrapper {...testTagProp(dataCy)} bigLogo={false} onClick={onClick}>
      <LogoIcon />
    </Wrapper>
  )
}
