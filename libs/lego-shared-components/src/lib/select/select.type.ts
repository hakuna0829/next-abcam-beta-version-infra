type SelectOption = { key: string | number; displayValue: string }

type SelectProps = {
  options: SelectOption[]
  onChange: (val: SelectOption) => void
}

export type { SelectProps, SelectOption }
