import { ReactElement } from 'react'

export type DropdownOption = {
  key: string
  displayValue: string
  shortDisplayValue?: string
}

export enum DropdownVariant {
  primary = 'primary',
  secondary = 'secondary',
}

export type DropdownProps = {
  options: DropdownOption[]
  onChange: (val: DropdownOption) => void
  children: ReactElement
  variant?: DropdownVariant
}
