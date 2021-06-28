import React from 'react'
import { Meta } from '@storybook/react'
import { Button } from '../button'
import { STORYBOOK_CONSTANTS } from '@abcam-web/lego-shared-components/lib/button/stories/constants'

import { Picture } from '@abcam-web/lego-shared-components/icons'

export default {
  title: 'Components/Button/Overview',
  component: Button,
} as Meta

const renderVariantGrid = (variant: any, as: any = 'button') => {
  const variantDisplayName = variant[0].toUpperCase() + variant.substring(1)
  return (
    <div className={'text-green-500'}>
      <h6>{variantDisplayName}</h6>
      <div className={'py-1 grid grid-cols-3 gap-y-4'}>
        {/*Regular sizes*/}
        {STORYBOOK_CONSTANTS.sizes.map((size: any) => {
          return (
            <Button as={as} key={size} variant={variant} size={size}>
              Button label
            </Button>
          )
        })}

        {/*Disabled*/}
        {STORYBOOK_CONSTANTS.sizes.map((size: any) => {
          return (
            <Button as={as} key={size} variant={variant} size={size} disabled>
              Button label
            </Button>
          )
        })}

        {/*iconLeft*/}
        {STORYBOOK_CONSTANTS.sizes.map((size: any) => {
          return (
            <Button
              as={as}
              variant={variant}
              size={size}
              iconLeft={<Picture />}
            >
              Button label
            </Button>
          )
        })}

        {/*iconRight*/}
        {STORYBOOK_CONSTANTS.sizes.map((size: any) => {
          return (
            <Button
              as={as}
              variant={variant}
              size={size}
              iconRight={<Picture />}
            >
              Button label
            </Button>
          )
        })}

        {/*icon both sides*/}
        {STORYBOOK_CONSTANTS.sizes.map((size: any) => {
          return (
            <Button
              as={as}
              variant={variant}
              size={size}
              iconLeft={<Picture />}
              iconRight={<Picture />}
            >
              Button label
            </Button>
          )
        })}

        {/*iconButton*/}
        {STORYBOOK_CONSTANTS.sizes.map((size: any) => {
          return (
            <Button as={as} variant={variant} size={size} iconButton>
              <Picture />
            </Button>
          )
        })}

        {/*iconButton disabled*/}
        {STORYBOOK_CONSTANTS.sizes.map((size: any) => {
          return (
            <Button as={as} variant={variant} size={size} iconButton disabled>
              <Picture />
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export const asButton = () => {
  return (
    <div className={'flex flex-col items-center'}>
      {renderVariantGrid('primary')}
      {renderVariantGrid('secondary')}
      {renderVariantGrid('tertiary')}
      {renderVariantGrid('quaternary')}
      {renderVariantGrid('quinary')}
    </div>
  )
}

export const asLink = () => {
  return (
    <div className={'flex flex-col items-center'}>
      {renderVariantGrid('primary', 'a')}
      {renderVariantGrid('secondary', 'a')}
      {renderVariantGrid('tertiary', 'a')}
      {renderVariantGrid('quaternary', 'a')}
      {renderVariantGrid('quinary', 'a')}
    </div>
  )
}
