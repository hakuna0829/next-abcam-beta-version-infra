import React from 'react'
import { Meta } from '@storybook/react'
import { Dropdown } from '@abcam-web/lego-shared-components/lib'
import { DropdownListWithSearch } from '@abcam-web/lego-shared-components/lib/dropdown/dropdownListWithSearch/dropdownListWithSearch'
import { DropdownVariant } from '@abcam-web/lego-shared-components/lib/dropdown/dropdown.type'
import {
  mockDropdownData,
  mockDropdownDataWithShortDisplayValue,
} from '@abcam-web/lego-shared-components/lib/dropdown/stories/mocks'

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: { onChange: { action: 'Value selected' } },
} as Meta

const withSearchProps = {
  title: 'Country/Region selector',
  searchPlaceholder: 'Select country/region',
} as any

const Template = (args: any) => <Dropdown {...args} />

export const WithShortDisplayValue = Template.bind({}) as any
WithShortDisplayValue.args = {
  options: mockDropdownDataWithShortDisplayValue,
  children: <DropdownListWithSearch {...withSearchProps} />,
}
WithShortDisplayValue.argTypes = {
  variant: {
    options: [DropdownVariant.primary, DropdownVariant.secondary],
    control: {
      type: 'radio',
    },
  },
}

export const WithTextValues = Template.bind({}) as any
WithTextValues.args = {
  options: mockDropdownData,
  children: <DropdownListWithSearch {...withSearchProps} />,
}
WithTextValues.argTypes = {
  variant: {
    options: [DropdownVariant.primary, DropdownVariant.secondary],
    control: {
      type: 'radio',
    },
  },
}
