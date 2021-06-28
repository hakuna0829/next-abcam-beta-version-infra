import React from 'react'
import useCopyToClipboard from '@browse/hooks/useCopyToClipboard'
import { blue60, green35, white } from '@browse/public'
import { style } from 'typestyle'

export interface CopyWrapperProps {
  copyValue: string | number
}

export const CopyWrapper: React.FC<CopyWrapperProps> = ({
  children,
  copyValue,
}) => {
  const [isCopied, handleCopy] = useCopyToClipboard()

  const copyColor = React.useMemo(() => {
    return isCopied ? green35 : blue60
  }, [isCopied])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleCopyClick = React.useCallback((arg) => handleCopy(arg), [])

  return (
    <div
      tabIndex={0}
      onClick={() => handleCopyClick(copyValue)}
      onKeyPress={() => handleCopyClick(copyValue)}
      onMouseLeave={() => handleCopyClick(false)}
      className={style({
        outline: 'none !important',
        position: 'relative',
        display: 'inline',
        placeSelf: 'flex-start',
        /*   width: '80%',*/ $nest: {
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

          //YETI-1794
          // PDP | "Copied" message isn't disappeared before you click or tap on the page again
          // '&:focus': {
          //     cursor: 'pointer',
          //     minWidth: '7.5rem',
          // },
          // '&:focus>*': {
          //     border: `2px solid ${copyColor}`,
          //     borderRadius: '8px',
          //     zIndex: 2,
          // },
          // '&:focus>:first-child': {
          //     display: 'block',
          // },
        },
      })}
    >
      <div
        className={style({
          backgroundColor: copyColor,
          borderBottomLeftRadius: '0 !important',
          borderBottomRightRadius: '0 !important',
          display: 'none',
          height: '23px',
          position: 'absolute',
          right: '10px',
          top: '-22px',
          width: '100px',
          textAlign: 'center',
        })}
      >
        <span
          className={style({
            fontSize: '12px',
            color: white,
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
  )
}

// eslint-disable-next-line import/no-default-export
export default CopyWrapper
