import React from 'react'
import { Meta } from '@storybook/react'
import { Select } from '../select'
import { SelectOption, SelectProps } from '../select.type'

const numberRange: SelectOption[] = []
for (let i = 1; i <= 10; i++) {
  numberRange.push({ key: i, displayValue: i.toString() })
}

const longNumberRange: SelectOption[] = []
for (let i = 1000; i <= 1010; i++) {
  longNumberRange.push({ key: i, displayValue: `${i} μg` })
}

const largeSetRange: SelectOption[] = []
for (let i = 1; i <= 100; i++) {
  largeSetRange.push({ key: i, displayValue: `${i} μg` })
}

const veryLongNumbersRange: SelectOption[] = []
for (let i = 100000000; i <= 100000009; i++) {
  veryLongNumbersRange.push({ key: i, displayValue: `${i} μg` })
}

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: { onChange: { action: 'Value selected' } },
} as Meta

const Template = (args: SelectProps) => <Select {...args} />

export const SelectComponent = Template.bind({}) as any
SelectComponent.args = {
  options: numberRange,
}
SelectComponent.argTypes = {}

export const SelectWithUnits = Template.bind({}) as any
SelectWithUnits.args = {
  options: longNumberRange,
}
SelectWithUnits.argTypes = {}

export const SelectWithLargeSet = Template.bind({}) as any
SelectWithLargeSet.args = {
  options: largeSetRange,
}
SelectWithLargeSet.argTypes = {}

export const SelectWithVeryLongNumber = Template.bind({}) as any
SelectWithVeryLongNumber.args = {
  options: veryLongNumbersRange,
}
SelectWithVeryLongNumber.argTypes = {}
