import React from 'react'
import { style } from 'typestyle'
import styled from 'styled-components'
import { blue60, spacing5 } from '@browse/public'
import { color } from '@browse/theme/color'

export interface Step {
  label: string
  to: string
}

export interface ReadMoreProps {
  symbolsCount: number
  text: string
}

const ReadMoreWrapper = styled.div`
  margin-bottom: ${spacing5};
  line-height: 1.5;
  color: ${color.backgroundGreyDark};
`
export const ReadMore: React.FC<ReadMoreProps> = ({ symbolsCount, text }) => {
  const [showAll, setShowAll] = React.useState<boolean>(false)

  if (text?.length <= symbolsCount) return <div>{text}</div>

  if (showAll)
    return (
      <ReadMoreWrapper>
        {text}{' '}
        <a
          className={style({
            color: blue60,
            cursor: 'pointer',
          })}
          onClick={() => setShowAll(false)}
        >
          less
        </a>
      </ReadMoreWrapper>
    )

  return (
    <ReadMoreWrapper>
      {text?.slice(0, symbolsCount)}{' '}
      <a
        className={style({
          color: blue60,
          cursor: 'pointer',
        })}
        onClick={() => setShowAll(true)}
      >
        more
      </a>
    </ReadMoreWrapper>
  )
}
