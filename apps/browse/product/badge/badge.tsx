import { blue60, greyTransparent } from '@browse/public'
import styled from 'styled-components'
import { color } from '@browse/theme/color'
import { px } from 'csx'

import type { FC } from 'react'
import type { BadgeProps, TagCodes } from './badge.types'

const getColor = (tagCode: TagCodes) => {
  switch (tagCode) {
    case 'RABMAB':
      return { text: blue60, background: 'rgba(0, 71, 187, 0.1)' }
    case 'RECOMBINANT':
      return { text: color.textGreyDark, background: greyTransparent(20) }
    default:
      return { text: color.textGreyDark, background: greyTransparent(20) }
  }
}

const getTitle = (tagCode: TagCodes) => {
  switch (tagCode) {
    case 'RABMAB':
      return 'RabMAb®'
    case 'RECOMBINANT':
      return 'Recombinant'
    default:
      return tagCode
  }
}

const BadgeWrap = styled.span<BadgeProps>`
  border-radius: 3px;
  padding: 0 0.6rem 0.313rem 0.6rem;
  display: inline;
  background-color: ${(props) => getColor(props.colorId)?.background};
`

const TextWrap = styled.span<BadgeProps>`
  opacity: 0.7;
  font-size: ${px(10)};
  letter-spacing: 0.63px;
  text-align: left;
  color: ${(props) => getColor(props.colorId)?.text};
`

const Badge: FC<BadgeProps> = (props: BadgeProps) => {
  return (
    <BadgeWrap {...props}>
      <TextWrap {...props}>{getTitle(props.title)}</TextWrap>
    </BadgeWrap>
  )
}

export { Badge }
