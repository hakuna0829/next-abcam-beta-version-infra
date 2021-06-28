import React from 'react'
import { px, rem } from 'csx'
import { grey95, grey20, greyTransparent } from '@browse/public'
import { Flex } from '@browse/components/flex'
import styled, { css } from 'styled-components'

const TagWrap = styled.div`
  background-color: ${grey95};
  border-radius: ${px(21)};
  ${({ theme }) => css`
    padding-top: ${rem(0.625)};
    padding-bottom: ${rem(0.625)};
    padding-left: ${theme.size.spacing[5]};
    padding-right: ${theme.size.spacing[4]};
    margin-left: ${theme.size.spacing[1]};
    margin-top: ${theme.size.layout[1]};
  `}
  border: unset;
  font-size: ${px(16)};
`

const LabelWrap = styled.div`
  font-size: ${rem(0.75)};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: ${px(0.5)};
  text-align: left;
  color: ${grey20};
  ${({ theme }) => css`
    margin-right: ${theme.size.spacing[2]};
  `}
`

const CountWrap = styled.div`
  border-radius: ${px(9)};
  background-color: ${greyTransparent(10)};
  font-size: ${rem(0.625)};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: normal;
  text-align: center;
  color: ${grey20};
  padding-left: ${rem(0.375)};
  padding-right: ${rem(0.375)};
`

export interface TagProps {
  name: string
  count: number
}

export const Tag: React.FC<TagProps> = (props: TagProps) => {
  return (
    <TagWrap key={props.name} {...props}>
      <Flex direction={'row'}>
        <LabelWrap>{props.name} </LabelWrap>
        <CountWrap>{props.count}</CountWrap>
      </Flex>
    </TagWrap>
  )
}

// eslint-disable-next-line import/no-default-export
export default Tag
