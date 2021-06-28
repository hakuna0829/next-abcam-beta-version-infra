import { ReactComponent as CheckboxIcon } from '@browse/public/icons/checkbox.svg'
import { ReactComponent as CheckboxCheckedIcon } from '@browse/public/icons/checkbox-checked.svg'
import { ReactComponent as RadioIcon } from '@browse/public/icons/radio.svg'
import { ReactComponent as RadioCheckedIcon } from '@browse/public/icons/radio-checked.svg'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { green43, grey20, spacing2 } from '@browse/public'

interface CheckboxProps {
  id: string
  type: 'checkbox' | 'radio'
  name?: string
  label: string
  checked?: boolean
  onCheckChange?: (label: string, newValue: boolean) => void
}

export const CheckboxWrapper = styled.div`
  display: inline;
  position: relative;
  min-height: 30px;
  line-height: 30px;
`
export const CheckboxNativeInput = styled.input`
  display: none;
`

interface CheckboxInputProps {
  active: boolean
}

export const CheckboxInput = styled.span<CheckboxInputProps>`
  float: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  svg path {
    fill: ${({ active }) => (active ? green43 : grey20)};
  }
`
export const CheckboxLabel = styled.label`
  position: relative;
  left: ${spacing2};
  top: 0.2rem;
  font-size: 0.75rem;
  font-weight: 'normal';
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.5px;
  color: black;
`

export const SpanLabel = styled.span`
  padding-left: 0.5rem;
`

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  type = 'checkbox',
  checked = false,
  label,
  name,
  onCheckChange,
}) => {
  const [active, setActiveState] = useState<boolean>(checked)

  useEffect(() => setActiveState(checked), [checked])

  return (
    <CheckboxWrapper>
      <CheckboxLabel htmlFor={id}>
        <CheckboxInput
          active={active}
          onKeyPress={() => {
            const newValue = !active
            setActiveState(newValue)
            onCheckChange && onCheckChange(label, newValue)
          }}
          onClick={() => {
            const newValue = !active
            setActiveState(newValue)
            onCheckChange && onCheckChange(label, newValue)
          }}
        >
          {type === 'checkbox' &&
            (active ? <CheckboxCheckedIcon /> : <CheckboxIcon />)}
          {type === 'radio' && (active ? <RadioCheckedIcon /> : <RadioIcon />)}
          <SpanLabel>{label}</SpanLabel>
        </CheckboxInput>
        <CheckboxNativeInput
          type={type}
          id={id}
          name={name}
          defaultChecked={active}
        />
      </CheckboxLabel>
    </CheckboxWrapper>
  )
}
