import React, { useContext, useMemo } from 'react'
import styled, { css, ThemeContext } from 'styled-components'

import { Theme } from '@browse/theme'
import { spacing2 } from '@browse/public'

type Backgrounds = 'light' | 'dark'

type Sizes = 'small' | 'medium' | 'large'

type Variants = 'primary' | 'secondary' | 'tertiary' | 'tertiaryFilled' | 'text'

interface Colorization {
  buttonColorStyle: any
  iconFill: string
}

type Map = { [key1 in Backgrounds]: { [key2 in Variants]: Colorization } }

function getColorization(
  theme: Theme,
  background: Backgrounds,
  variant: Variants,
  disabled: boolean
): Colorization {
  const map: Map = {
    light: {
      primary: {
        buttonColorStyle: css`
          color: ${theme.color.textWhite};
          background-color: ${disabled
            ? theme.color.lightPrimaryButtonDisabledBackground
            : theme.color.blue};
          &:hover {
            background-color: ${theme.color.interactiveBlueHover};
          }
          &:focus {
            background-color: ${theme.color.interactiveBlueActive};
          }
          &:active {
            background-color: ${theme.color.interactiveBlueActive};
          }
        `,
        iconFill: theme.color.textWhite,
      },

      secondary: {
        buttonColorStyle: css`
          color: ${theme.color.textWhite};
          background-color: ${disabled
            ? theme.color.lightSecondaryButtonDisabledBackground
            : theme.color.interactiveGreyDarkDefault};
          &:hover {
            background-color: ${theme.color.interactiveGreyDarkHover};
          }
          &:focus {
            background-color: ${theme.color.interactiveGreyDarkActive};
          }

          &:active {
            background-color: ${theme.color.interactiveGreyDarkActive};
          }
        `,
        iconFill: theme.color.textWhite,
      },

      tertiary: {
        buttonColorStyle: css`
          color: ${disabled
            ? theme.color.lightTertiaryButtonDisabledColorText
            : theme.color.textGreyDark};
          background-color: ${disabled
            ? theme.color.lightTertiaryButtonDisabledBackground
            : 'transparent'};
          border: solid 1px
            ${disabled
              ? theme.color.lightTertiaryButtonDisabledBorderColor
              : theme.color.backgroundLightbox};
          &:hover {
            background-color: ${theme.color.interactiveGreyTransparentHover};
          }
          &:focus {
            background-color: ${theme.color.interactiveGreyTransparentActive};
          }
          &:active {
            background-color: ${theme.color.interactiveGreyTransparentActive};
          }
        `,
        iconFill: disabled
          ? theme.color.lightTertiaryButtonDisabledColorText
          : theme.color.textGreyDark,
      },

      tertiaryFilled: {
        buttonColorStyle: css`
          color: ${disabled
            ? theme.color.lightTertiaryFilledButtonDisabledColorText
            : theme.color.textGreyDark};
          background-color: ${disabled
            ? theme.color.lightTertiaryFilledButtonDisabledBackground
            : theme.color.interactiveGreyTransparentHover};
          &:hover {
            background-color: ${theme.color.interactiveGreyTransparentActive};
          }
          &:focus {
            background-color: ${theme.color.interactiveGreyTransparentActive};
          }

          &:active {
            background-color: rgba(39, 63, 63, 0.15);
          }
        `,
        iconFill: disabled
          ? theme.color.lightTertiaryFilledButtonDisabledColorText
          : theme.color.textGreyDark,
      },

      text: {
        buttonColorStyle: css`
          color: ${disabled
            ? theme.color.lightTextOnlyButtonDisabledColorText
            : theme.color.textWhite};
          background-color: transparent;
        `,
        iconFill: disabled
          ? theme.color.lightTextOnlyButtonDisabledColorText
          : theme.color.textWhite,
      },
    },

    dark: {
      primary: {
        buttonColorStyle: css`
          color: ${theme.color.textWhite};
          background-color: ${theme.color.blue};
        `,
        iconFill: theme.color.textWhite,
      },

      secondary: {
        buttonColorStyle: css`
          color: ${theme.color.textGreyDark};
          background-color: ${theme.color.backgroundGrey};
        `,
        iconFill: theme.color.textGreyDark,
      },

      tertiary: {
        buttonColorStyle: css`
          color: ${theme.color.backgroundGrey};
          background-color: transparent;
          border: solid 1px ${theme.color.strokeDarkBGMedium};
        `,
        iconFill: theme.color.backgroundGrey,
      },

      tertiaryFilled: {
        buttonColorStyle: css`
          color: ${theme.color.backgroundGrey};
          background-color: ${theme.color.interactiveWhiteTransparentHover};
        `,
        iconFill: theme.color.backgroundGrey,
      },

      text: {
        buttonColorStyle: css`
          color: ${theme.color.backgroundGrey};
          background-color: transparent;
        `,
        iconFill: theme.color.backgroundGrey,
      },
    },
  }

  return map[background][variant]
}

export const icons = {
  small: {
    width: 13,
    height: 13,
    viewBox: '0 0 24 24',
  },

  medium: {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
  },

  large: {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
  },
}

interface WrapperProps {
  size: Sizes
  disabled: boolean
  colorStyle: string
  leftIcon: boolean
  rightIcon: boolean
  iconOnly: boolean
}

const Wrapper = styled.button<WrapperProps>`
  cursor: pointer;
  border: unset;
  font-family: Eina03-Semibold;
  white-space: nowrap;

  &:focus {
    outline: none;
  }

  ${({ colorStyle: style }) => style}

  ${({ theme, size, leftIcon, rightIcon, iconOnly }) => {
    switch (size) {
      case 'small':
        return css`
          padding: ${leftIcon &&
            !iconOnly &&
            theme.size.paddings.small.leftIcon}
            ${rightIcon && !iconOnly && theme.size.paddings.small.rightIcon}
            ${!leftIcon &&
            !rightIcon &&
            !iconOnly &&
            theme.size.paddings.small.noIcon};
          border-radius: ${theme.size.corner.small};
          font-size: ${theme.size.text.uiSmall};
          ${iconOnly &&
          `
                        width: 2rem;
                        height: 2rem;
                    `}
        `

      case 'medium':
        return css`
          padding: ${leftIcon &&
            !iconOnly &&
            theme.size.paddings.medium.leftIcon}
            ${rightIcon && !iconOnly && theme.size.paddings.medium.rightIcon}
            ${!leftIcon &&
            !rightIcon &&
            !iconOnly &&
            theme.size.paddings.medium.noIcon};
          border-radius: ${theme.size.corner.medium};
          font-size: ${theme.size.text.uiMedium};
          ${iconOnly &&
          `
                        width: 2.5rem;
                        height: 2.5rem;
                    `}
        `

      case 'large':
        return css`
          padding: ${leftIcon &&
            !iconOnly &&
            theme.size.paddings.large.leftIcon}
            ${rightIcon && !iconOnly && theme.size.paddings.large.rightIcon}
            ${!leftIcon &&
            !rightIcon &&
            !iconOnly &&
            theme.size.paddings.large.noIcon};
          border-radius: ${iconOnly
            ? theme.size.corner[6]
            : theme.size.corner.large};
          font-size: ${theme.size.text.uiLarge};
          ${iconOnly &&
          `
                        width: 3.5rem;
                        height: 3.5rem;
                    `}
        `
    }
  }}

        ${({ disabled }) =>
    disabled &&
    `
            cursor: unset;
        `}
`

interface LabelProps {
  leftIcon?: boolean
  rightIcon?: boolean
}

const Label = styled.span<LabelProps>`
  font-family: 'Eina03-Semibold';
  ${({ leftIcon }) => (leftIcon ? `margin-left: ${spacing2};` : '')}
  ${({ rightIcon }) => (rightIcon ? `margin-right: ${spacing2};` : '')}
`

interface IconProps {
  fill: string
}

const Icon = styled.span<IconProps>`
  display: flex;
  svg path {
    fill: ${({ fill }) => fill};
  }
`

const LabelWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`

export interface ButtonProps extends React.DOMAttributes<HTMLButtonElement> {
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  icon?: JSX.Element

  background?: Backgrounds
  variant?: Variants
  size?: Sizes
  disabled?: boolean
  style?: any
  ref?: any
  fill?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,

  leftIcon,
  rightIcon,
  icon,

  background = 'light',
  variant = 'text',
  size = 'medium',
  fill,
  disabled = false,
  ...props
}) => {
  const iconOnly = !!icon
  const theme = useContext(ThemeContext)

  const { buttonColorStyle, iconFill } = useMemo(
    () => getColorization(theme, background, variant, disabled),
    [theme, background, variant, disabled]
  )

  return (
    <Wrapper
      tabIndex={0}
      size={size}
      colorStyle={buttonColorStyle}
      type="button"
      {...props}
      disabled={disabled}
      iconOnly={iconOnly}
      leftIcon={!!leftIcon}
      rightIcon={!!rightIcon}
    >
      <LabelWrapper>
        {!iconOnly && leftIcon && (
          <Icon fill={fill || iconFill}>
            {React.cloneElement(leftIcon, icons[size])}
          </Icon>
        )}

        {!iconOnly && (
          <Label leftIcon={!!leftIcon} rightIcon={!!rightIcon}>
            {children}
          </Label>
        )}

        {!iconOnly && rightIcon && (
          <Icon fill={fill || iconFill}>
            {React.cloneElement(rightIcon, icons[size])}
          </Icon>
        )}

        {icon && (
          <Icon fill={fill || iconFill}>
            {React.cloneElement(icon, icons[size])}
          </Icon>
        )}
      </LabelWrapper>
    </Wrapper>
  )
}
