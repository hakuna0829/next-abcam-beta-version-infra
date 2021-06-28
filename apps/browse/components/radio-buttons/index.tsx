import { useState } from 'react'
import { ReactComponent as Radio } from '@browse/public/icons/radio.svg'
import { ReactComponent as RadioChecked } from '@browse/public/icons/radio-checked.svg'
import styled from 'styled-components'

export interface RadioOption {
  label: string
  value: string
}
interface RadioButtonsProps {
  options: RadioOption[]
  name: string
  initialValue?: string
  onChange?: (value: string) => void
}

const RadioCheckedWrapper = styled.span`
  svg path {
    fill: red;
  }
`
const RadioWrapper = styled.span`
  svg path {
    fill: blue;
  }
`

export const RadioButtons: React.FC<RadioButtonsProps> = ({
  options,
  name,
  initialValue,
  onChange,
}) => {
  const [value, setValue] = useState<string | undefined>(initialValue)
  return (
    <>
      {options.map((option, index) => (
        <div key={index}>
          {value === option.value ? (
            <RadioCheckedWrapper>
              <RadioChecked />
            </RadioCheckedWrapper>
          ) : (
            <RadioWrapper>
              <Radio />
            </RadioWrapper>
          )}
          <input
            id={index.toString()}
            type="radio"
            value={option.value}
            name={name}
            onChange={(event) => {
              const newValue = event.target.value
              setValue(newValue)
              onChange && onChange(newValue)
            }}
          />
          <label htmlFor={index.toString()}>{option.label}</label>
        </div>
      ))}
    </>
  )
}
