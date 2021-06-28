import type { ReactNode } from 'react'

type ButtonProps = {
  as?: 'a' | 'button'
  children?: ReactNode
  className?: string
  bodyClassName?: string
  disabled?: boolean
  href?: string
  onClick?: () => void
  openInNewWindow?: boolean
  size?: 'small' | 'medium' | 'large'
  variant: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary'
  iconLeft?: ReactNode
  iconRight?: ReactNode
  iconButton?: boolean
}

export type { ButtonProps }
