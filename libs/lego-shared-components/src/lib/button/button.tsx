import React from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import type { FC, SyntheticEvent } from 'react'
import type { ButtonProps } from './button.type'

import styles from './button.module.css'

const Button: FC<ButtonProps> = ({
  as = 'button',
  children,
  className,
  bodyClassName,
  disabled,
  href = '',
  onClick,
  openInNewWindow = false,
  size = 'large',
  variant = 'primary',
  iconLeft,
  iconRight,
  iconButton = false,
  ...otherProps
}) => {
  const router = useRouter()

  const htmlClassName = cn(
    styles.container,
    styles[variant],
    styles[size],
    className,
    bodyClassName,
    { [styles.disabled]: disabled },
    { [styles.iconButton]: iconButton }
  )

  const handleAnchorClick = (e: SyntheticEvent) => {
    e.preventDefault()
    router.push(href)
  }

  const contentClassName = cn(styles.content, bodyClassName)
  if (as === 'button') {
    return (
      <button
        className={htmlClassName}
        disabled={disabled}
        onClick={onClick}
        type="button"
        {...otherProps}
      >
        {iconLeft && iconLeft}
        <span className={contentClassName}>{children}</span>
        {iconRight && iconRight}
      </button>
    )
  }
  return (
    <a
      className={htmlClassName}
      href={href}
      {...(!openInNewWindow && { onClick: handleAnchorClick })}
      {...(openInNewWindow && { rel: 'noreferrer', target: '_blank' })}
      {...otherProps}
    >
      {iconLeft && iconLeft}
      <span className={contentClassName}>{children}</span>
      {iconRight && iconRight}
    </a>
  )
}

export { Button }
