import React from 'react'
import { Meta } from '@storybook/react'

const tailwindConfig = require('../../../../../tailwind.config')

export default {
  title: 'Styleguide/typography',
} as Meta

const headerText = 'MitoTox™ Complete OXPHOS Activity Assay Kit (5 Assays)'
const bodyText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu erat dictum, lacinia ligula at, commodo libero. Donec finibus, lacus in commodo commodo, dui magna vestibulum lacus, vel ultricies velit neque sed ante. Nulla non sapien eu magna tincidunt venenatis. Donec ac blandit odio, a molestie urna.'
const symbols = '? £ { } & % $ € ~'

const getDisplayText = (valName: string) => {
  if (valName.indexOf('heading') !== -1) {
    return headerText
  }
  if (valName.indexOf('body') !== -1) {
    return `${bodyText} \n ${symbols}`
  }
  if (valName.indexOf('ui') !== -1) {
    return 'Call to action'
  }
}

const remsToPixels = (val: string) => {
  const remValue = val.split('rem')[0] as any
  return remValue * 16
}

const getRuleValuesContent = (ruleValues: any[]) => {
  const [sizeValueInRem, spacing] = ruleValues
  const sizeValueInPixel = remsToPixels(sizeValueInRem)
  const { letterSpacing, lineHeight } = spacing
  let string = `${sizeValueInRem} (${sizeValueInPixel}px), `

  if (letterSpacing) {
    string += `letter-spacing: ${letterSpacing} (${remsToPixels(
      letterSpacing
    )}px), `
  }
  if (lineHeight) {
    string += `line-height: ${lineHeight}`
  }
  return string
}

export const index = () => (
  <div>
    <div className={'text-black flex flex-col pb-1 max-w-6xl'}>
      {Object.entries(tailwindConfig.theme.extend.fontSize).map(
        (styleObject: any) => {
          const [ruleName, ruleValues] = styleObject
          const cn = `text-${ruleName} text-gray-700 whitespace-pre-line`
          const displayText = getDisplayText(ruleName)
          const rulesDisplayText = getRuleValuesContent(ruleValues)
          return (
            <div className={'flex flex-col pb-4'}>
              <span className={'text-green-500'}>{ruleName}</span>
              <span className={'pb-3 text-green-500'}>{rulesDisplayText}</span>
              <span className={cn}>{displayText}</span>
            </div>
          )
        }
      )}
    </div>
  </div>
)
