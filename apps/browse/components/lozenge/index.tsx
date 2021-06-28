import styled from 'styled-components'
import { bodyMedium, corner6, spacing2, spacing4 } from '@browse/public'

interface ButtonProps {
  focused?: boolean
  variant?: LozengeVariant
}

const Wrapper = styled.button<ButtonProps>`
  cursor: pointer;
  font-family: 'Eina03-Semibold';
  background-color: ${({ theme, focused, variant }) =>
    focused
      ? theme.color.green + ' !important' // TODO: redo into better condition to set background
      : variant === 'light'
      ? 'rgba(255, 255, 255, 0.9)'
      : theme.color.interactiveWhiteTransparentHover};
  white-space: nowrap;
  border: none;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ variant, theme, focused }) =>
    focused
      ? theme.color.textWhite
      : variant === 'light'
      ? theme.color.textGreyDark
      : theme.color.textWhite};
  display: inline-block;
  font-size: ${bodyMedium};
  border-radius: ${corner6};
  padding: ${spacing2} ${spacing4};

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === 'light'
        ? theme.color.textWhite
        : theme.color.interactiveWhiteTransparentActive};
  }

  &:active {
    background-color: ${({ theme, variant }) =>
      variant === 'light'
        ? 'rgba(255, 255, 255, 0.9)'
        : 'rgba(255, 255, 255, 0.15)'};
  }
`

type LozengeVariant = 'dark' | 'light'

interface LozengeProps {
  key?: number
  variant?: LozengeVariant
  focused?: boolean
  onMouseEnter?: (event: React.MouseEvent) => void
  onMouseLeave?: (event: React.MouseEvent) => void
  onClick?: (event: React.MouseEvent) => void
}

export const Lozenge: React.FC<LozengeProps> = ({
  key,
  variant = 'dark',
  children,
  focused,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <Wrapper
      data-cy={'search-lozenge'}
      key={key}
      focused={focused}
      variant={variant}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Wrapper>
  )
}
