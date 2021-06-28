import React from 'react'
import { style, types } from 'typestyle'
import { rem, scale } from 'csx'
import {
  blueTransparentHover,
  grey60,
  greyTransparent,
  layout1,
  layout3,
  spacing2,
} from '@browse/public'
import styled, { css } from 'styled-components'
import { Badge } from '@browse/product/badge/badge'

import { color } from '@browse/theme/color'

import type { FC } from 'react'
import type { TagCodes } from '@browse/product/badge/badge.types'
import type { OurBrandsDrawerPropTypes } from './our-brands-drawer.type'

const cardStyle: types.NestedCSSProperties = {
  marginTop: spacing2,
  padding: `${rem(1.4)} ${layout1}`,
}

const cardDescription: types.NestedCSSProperties = {
  height: '2.25rem',
  fontSize: '0.75rem',
  fontWeight: 'normal',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 1.5,
  letterSpacing: '0.5px',
  textAlign: 'left',
}

export const InfoIcon = styled.span`
  color: ${grey60};
  width: ${rem(1.125)};
  height: ${rem(1.125)};
  &:hover {
    cursor: pointer;
  }
  svg {
    width: 18px;
  }
  path {
    fill: ${grey60};
    transform: ${scale(0.9)};
  }

  ${({ theme }) => css`
    margin-right: ${theme.size.layout[2]};
    margin-left: ${theme.size.spacing[2]};
  `}
`

const getPanelColor = (tagCode: TagCodes) => {
  switch (tagCode) {
    case 'RABMAB':
      return { color: blueTransparentHover(5) }
    case 'RECOMBINANT':
      return { color: greyTransparent(5) }
    default:
      return { color: greyTransparent(5) }
  }
}

const getTextColor = (tagCode: TagCodes) => {
  switch (tagCode) {
    case 'RABMAB':
      return { color: '#0041ab' }
    case 'RECOMBINANT':
      return { color: color.backgroundGreyDark }
    default:
      return { color: color.backgroundGreyDark }
  }
}

const OurBrandsDrawer: FC<OurBrandsDrawerPropTypes> = ({ productTags }) => {
  const productsTagsDescriptions = [
    { id: 'Recombinant', description: 'Recombinant description' },
    { id: 'RabMab', description: 'RabMab© description' },
    { id: 'Test tag', description: 'Test tag for product' },
  ]

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {productTags?.map((tag) => (
        <div
          key={tag.tagCode}
          className={style(cardStyle, {
            backgroundColor: getPanelColor(tag.tagCode).color,
            marginLeft: layout3,
            marginRight: layout3,
          })}
        >
          <Badge colorId={tag.tagCode} title={tag.tagCode} />
          <p
            className={style(cardDescription, {
              color: getTextColor(tag.tagCode).color,
              marginBottom: '12px',
              marginTop: '8px',
            })}
          >
            {
              productsTagsDescriptions.find(
                ({ id }) => id.toUpperCase() === tag.tagCode.toUpperCase()
              )?.description
            }
          </p>
        </div>
      ))}
    </>
  )
}

export { OurBrandsDrawer }
