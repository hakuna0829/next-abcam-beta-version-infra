import React from 'react'
import { Meta } from '@storybook/react'

const tailwindConfig = require('../../../../../tailwind.config')

export default {
  title: 'Styleguide/boxShadow',
} as Meta

export const index = () => (
  <div>
    <div className={'text-black flex flex-row'}>
      {Object.entries(tailwindConfig.theme.extend.boxShadow).map(
        (styleObject: any) => {
          const [name, value] = styleObject
          const cn = `shadow-${name} background-white min-w-full min-h-full`
          return (
            <div className={'flex flex-col flex-grow h-36 w-36 pr-10'}>
              <span className={'text-green-500 text-xs'}>{name}</span>
              <span className={'text-green-500 text-xs pb-3'}>{value}</span>
              <div className={cn} />
            </div>
          )
        }
      )}
    </div>
  </div>
)
