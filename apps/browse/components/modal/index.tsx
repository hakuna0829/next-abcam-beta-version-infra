import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled, { css } from 'styled-components'

import { useOnClickOutside } from '@browse/hooks/useOnClickOutside'

import { zIndex } from '@browse/constants'

import { ReactComponent as Cross } from '@browse/public/icons/cross.svg'

interface WrapperProps {
  show: boolean
  width: string
}

const Wrapper = styled.div<WrapperProps>`
  z-index: ${zIndex.modal};
  position: fixed;
  transition: bottom 0.5s linear, top 0.5s linear;
  transition-timing-function: cubic-bezier(0.4, 0, 0, 1);
  border-radius: 16px;
  ${({ width, show, theme }) => {
    return css`
      background-color: ${theme.color.backgroundWhite};
      border: 1px solid rgba(39, 63, 63, 0.1); // TODO theme
      ${theme.elevation[4]}

      width: ${width};
      bottom: ${show ? '0' : `-100rem`};
      position: ${show ? 'relative' : ''};
    `
  }}

  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => css`
    height: ${theme.size.layout[6]};
    padding-left: ${theme.size.layout[3]};
    padding-right: ${theme.size.layout[3]};
  `}
`

const CloseContainer = styled.div``

const Close = styled(Cross)`
  cursor: pointer;
`

const Body = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`

const Footer = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.size.spacing[3]};
  `}
  font-weight: 'normal';
  line-height: 1.5;
  letter-spacing: 0.5px;
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const FooterText = styled.div`
  display: inline;
`

const FooterLink = styled.a`
  padding-left: 0.5rem;
  cursor: pointer;
  ${({ theme }) => css`
    color: ${theme.color.blue};
  `}
`

interface BackGroundProps {
  show: boolean
}
const BackGround = styled.div<BackGroundProps>`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ show }) => css`
    z-index: ${show ? zIndex.modal : zIndex.nether};
    opacity: ${show ? 1 : 0};
    transition: opacity 0.5s, z-index 0.5s cubic-bezier(0.4, 0, 0, 1);
  `}
`

export interface ModalProps {
  header?: JSX.Element
  onClose: (show: boolean) => void
  show: boolean
  width: string
  height: string
  showFooter: boolean
}

export const Modal: React.FC<ModalProps> = ({
  children,
  header,
  width,
  height,
  onClose,
  show,
  showFooter,
}) => {
  const close = useCallback(() => {
    onClose(false)
  }, [onClose])

  useEffect(() => {
    if (show) {
      document.body.style.height = '100vh'
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.height = ''
      document.body.style.overflowY = ''
    }
  }, [show])

  const ref = useOnClickOutside(close)

  return createPortal(
    <BackGround show={show}>
      <Wrapper width={width} ref={ref} show={show}>
        <Header>
          <h3>{header}</h3>
          <CloseContainer>
            <Close onClick={close} />
          </CloseContainer>
        </Header>

        <Body>{children}</Body>

        {showFooter && (
          <Footer>
            <FooterText>
              Abcam will process your data in accordance with its
            </FooterText>
            <FooterLink
              href={'https://www.abcam.com/content/privacy-policy'}
              target="_blank"
            >
              Privacy policy
            </FooterLink>
          </Footer>
        )}
      </Wrapper>
    </BackGround>,
    document.body
  )
}
