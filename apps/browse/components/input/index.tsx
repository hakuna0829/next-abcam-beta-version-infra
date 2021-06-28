import React from 'react'
import { style } from 'typestyle'

import {
  uiLarge,
  grey20,
  greyTransparent,
  lineHeightNormal,
  primaryBorder,
  primaryInvisibleBorder,
  spacing1,
  spacing4,
  spacing5,
} from '@browse/public'

export interface InputProps {
  label?: string
  hintText?: string
  placeholder?: string
  errorText?: string
  type?: 'text' | 'password'
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputProps> = (props) => {
  const inputClassName = React.useMemo(() => {
    const border = props.errorText ? primaryBorder : primaryInvisibleBorder

    return style({
      backgroundColor: greyTransparent(5),
      border: border,
      padding: `${spacing4} ${spacing5}`,
      marginBottom: spacing1,
      color: grey20,

      $nest: {
        '&:focus': {
          border: primaryBorder,
          backgroundColor: greyTransparent(10),
        },
        '&:hover': {
          backgroundColor: greyTransparent(10),
        },
        '&::placeholder': {
          color: grey20,
        },
      },
    })
  }, [props.errorText])

  const textCommonStyle = {
    display: 'block',
    fontSize: uiLarge,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: lineHeightNormal,
    letterSpacing: 'normal',
    color: grey20,
  }

  // TODO remove after all be rewritten to tailwind
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const labelClassName = style(textCommonStyle)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const hintTextClassName = style(textCommonStyle)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const errorTextClassName = style(textCommonStyle, { textAlign: 'right' })
  const wrapperClassName = style({
    width: '200px',
  })

  return (
    <div className={wrapperClassName}>
      {props.label && <label className={labelClassName}>{props.label}</label>}
      <input
        type={props.type}
        className={inputClassName}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      {!props.errorText && props.hintText && (
        <div className={hintTextClassName}>{props.hintText}</div>
      )}
      {props.errorText && (
        <div className={errorTextClassName}>{props.errorText}</div>
      )}
    </div>
  )
}
