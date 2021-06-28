import type { FC, ReactNode } from 'react'
import { style } from 'typestyle'

import { useCopy } from './use-copy.hooks'

import tailwind from '../../../../tailwind.config'

type PropTypes = {
  children: ReactNode
  copyValue: string | number
}

export const CopyWrapper: FC<PropTypes> = ({ children, copyValue }) => {
  const { isCopied, copyToClipBoard, setCopied } = useCopy(copyValue.toString())
  const copyColor = isCopied
    ? tailwind.theme.extend.colors.green35
    : tailwind.theme.extend.colors.buttonPrimary
  const onMouseLeave = () => setCopied(false)

  return (
    <div className="relative">
      <div
        tabIndex={0}
        onClick={copyToClipBoard}
        onKeyPress={copyToClipBoard}
        onMouseLeave={onMouseLeave}
        className={style({
          outline: 'none',
          display: 'inline',
          placeSelf: 'flex-start',
          $nest: {
            '&:hover': {
              cursor: 'pointer',
              minWidth: '7.5rem',
            },
            '&:hover>*': {
              border: `2px solid ${copyColor}`,
              borderRadius: '8px',
              zIndex: 2,
            },
            '&:hover>:first-child': {
              display: 'block',
            },
          },
        })}
      >
        <div
          role="button"
          className={style({
            backgroundColor: copyColor,
            borderBottomLeftRadius: '0 !important',
            borderBottomRightRadius: '0 !important',
            display: 'none',
            height: '23px',
            position: 'absolute',
            right: '10px',
            top: '-23px',
            width: '100px',
            textAlign: 'center',
          })}
        >
          <span
            className={style({
              fontSize: '12px',
              color: 'white',
              marginTop: '-3px',
              display: 'block',
            })}
          >
            {!isCopied && <span>Click to copy</span>}
            {isCopied && <span>Copied!</span>}
          </span>
        </div>
        <div
          className={style({
            border: '2px solid transparent',
            display: 'flex',
            zIndex: 2,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
