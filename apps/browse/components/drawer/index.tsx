import { SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styled, { css } from 'styled-components'
import { useOnClickOutside } from '@browse/hooks/useOnClickOutside'
import { zIndex } from '@browse/constants'
import { ReactComponent as Cross } from '@browse/public/icons/cross.svg'
import { medium } from '@browse/breakpoints'
import { rem } from 'csx'

type Positions = 'left' | 'right'
type Sizes = 'small' | 'large'

function getWidth(size: Sizes) {
  switch (size) {
    case 'small':
      return '20rem'

    case 'large':
      return '35rem'
  }
}

interface WrapperProps {
  position: Positions
  show: boolean
  size: Sizes
}

const Wrapper = styled.div<WrapperProps>`
  z-index: ${zIndex.drawer};
  position: fixed;
  top: 0;

  height: 100vh;

  transition: left 0.5s linear, right 0.5s linear;
  transition-timing-function: cubic-bezier(0.4, 0, 0, 1);

  ${({ position, show, size, theme }) => {
    const width = getWidth(size)

    return css`
      background-color: ${theme.color.backgroundWhite};
      border: 1px solid rgba(39, 63, 63, 0.1); // TODO theme
      ${theme.elevation[4]}

      @media (min-width: 640px) {
        width: ${width};
        ${position}: ${show ? 0 : `calc(-${width} - 1rem)`};
      }

      @media (max-width: 640px) {
        width: 100vw;
        ${position}: ${show ? 0 : '-100vw'};
      }
    `
  }}

  display: flex;
  flex-direction: column;
`

const Header = styled.div<{ height: string }>`
  ${({ height }) => css`
    height: ${height};
  `}

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /*margin-top: 1.875rem;*/

  ${({ theme }) => css`
    padding-left: ${theme.size.layout[3]};
    padding-right: ${theme.size.layout[2]};

    @media (max-width: ${medium}px) {
      padding-right: ${rem(3.5)};
    }

    border-bottom: 1px solid rgba(39, 63, 63, 0.1);
    box-shadow: 0 2px 4px 0 rgba(39, 63, 63, 0.1);
    z-index: ${zIndex.modal};
  `}
`

const CloseContainer = styled.span`
  transform: scale(0.9);
  width: 40px;
  height: 40px;
  padding-top: 10px;
  padding-left: 10px;
  cursor: pointer;
`

const Close = styled(Cross)``

const Body = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`

interface ModalProps {
  show: boolean
}
const BackGround = styled.div<ModalProps>`
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

export interface DrawerProps {
  header?: JSX.Element
  onClose: (show: boolean, event: SyntheticEvent) => void
  position?: Positions
  size?: Sizes
  show: boolean
  headerHeight?: string
  isCloseOnOutsideClick?: boolean
  showOverlay?: boolean
}

export const Drawer: React.FC<DrawerProps> = ({
  children,
  header,
  onClose,
  position = 'right',
  size = 'large',
  show,
  headerHeight = '5rem',
  isCloseOnOutsideClick = false,
  showOverlay = false,
}) => {
  const close = useCallback(
    (event) => {
      onClose(false, event)
    },
    [onClose]
  )

  const refPortal = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    refPortal.current = document.body
  }, [])

  const ref = useOnClickOutside(
    show && isCloseOnOutsideClick ? close : () => undefined
  )

  const MainContent = () => {
    return (
      <Wrapper position={position} ref={ref} show={show} size={size}>
        <Header height={headerHeight}>
          {header}
          <CloseContainer onClick={close}>
            <Close data-cy={'close-button'} />
          </CloseContainer>
        </Header>

        <Body>{children}</Body>
      </Wrapper>
    )
  }

  return refPortal.current
    ? createPortal(
        showOverlay ? (
          <BackGround show={show}>
            <MainContent />
          </BackGround>
        ) : (
          <MainContent />
        ),
        refPortal.current!
      )
    : null
}
