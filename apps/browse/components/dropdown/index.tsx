import React, { createContext } from 'react'
import styled, { css } from 'styled-components'
import { Button } from '@browse/components/button'
import { ReactComponent as ChevronUp } from '@browse/public/icons/chevron-up.svg'
import { ReactComponent as Cross } from '@browse/public/icons/cross.svg'
import { Checkbox } from '@browse/components/checkbox'
import { green35, white } from '@browse/public'
import { useOnClickOutside } from '@browse/hooks/useOnClickOutside'
import { ChevronDown } from '@abcam-web/lego-shared-components/icons'

interface WrapperProps {
  show: boolean
  size: 'small' | 'medium'
}

const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  top: 3rem;
  ${({ size }) =>
    size === 'small' &&
    `
    top: 2rem;
  `}
  min-width: 14rem;
  z-index: 999;
  border-radius: 8px;
  box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.2);
  background-color: ${white};
  display: none;
  ${({ show }) =>
    show &&
    `
    display: flex;
    flex-direction: column;
    padding-right: 1rem;
  `}
`

const FilterButton = styled(Button)`
  &:focus {
    border: 3px solid ${green35} !important;
    overflow: hidden;
    margin: -3px;
  }
`

const ActionButtonWrapper = styled.div`
  display: flex;
  padding: 0.5rem 1rem 1rem 1rem;
  justify-content: space-between;
`

const ActionButton = styled(Button)`
  ${({ theme }) => css`
    border: solid 1px ${theme.color.lightTertiaryButtonDisabledBorderColor} !important;
  `}
`
interface WrapperButtonProps {
  style?: any
}

const WrapperButton = styled.div<WrapperButtonProps>`
    position: relative;
    ${({ style }) => style}
}
`

const Close = styled(Cross)`
  cursor: pointer;
`

const ChevronDownIcon = styled(ChevronDown)`
  ${({ theme }) =>
    `path {
        fill: ${theme.color.textGreyDark};
    }`}
`

const ChevronUpIcon = styled(ChevronUp)`
  ${({ theme }) =>
    `path {
        fill: ${theme.color.textGreyDark};
    }`}
`

export enum DropDownType {
  Single = 'SINGLE',
  Multi = 'MULTI',
}

export enum SelectorType {
  CheckBox = 'checkbox',
  RadioButton = 'radio',
  Base = 'base',
}

type Sizes = 'small' | 'medium'

export interface DropdownProps {
  label?: React.ReactElement
  type: DropDownType
  selectorType: SelectorType
  onSelect?: (selected: string) => void
  size?: Sizes
  style?: any
  clearAction?: (label: string) => void
  showFooter?: boolean
}

const DropDownContext = createContext({
  type: DropDownType.Single,
  selectorType: SelectorType.CheckBox,
  checkedList: [] as string[],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleCheckDropDown: (value: string, checked: boolean) => {},
})

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  selectorType = SelectorType.Base,
  showFooter = false,
  size = 'medium',
  ...props
}) => {
  const [show, setShow] = React.useState(false)
  const [selected, setSelected] = React.useState([] as string[])
  const ref = useOnClickOutside(() => setShow(false))
  return (
    <WrapperButton data-cy={'drop-down'} ref={ref}>
      <FilterButton
        variant={'tertiary'}
        rightIcon={show ? <ChevronUpIcon /> : <ChevronDownIcon />}
        size={size}
        onClick={() => setShow((show) => !show)}
      >
        {props.label}
      </FilterButton>

      <Wrapper show={show} size={size}>
        <DropDownContext.Provider
          value={{
            type: props.type,
            selectorType,
            checkedList: selected,
            toggleCheckDropDown: (value: string, checked: boolean) => {
              if (checked) {
                if (props.type === DropDownType.Multi) {
                  setSelected(selected.concat(value))
                } else {
                  setSelected([value])
                }

                return
              }

              const selectedLocal = Object.assign([], selected)
              const removeItemIndex = selected.indexOf(value, 0)

              if (removeItemIndex > -1) {
                selectedLocal.splice(removeItemIndex, 1)
                setSelected(selectedLocal)
              }
              return
            },
          }}
        >
          <Item>{children}</Item>
        </DropDownContext.Provider>

        {showFooter && (
          <ActionButtonWrapper>
            {/*<ActionButton variant='tertiary' size='small' onClick={props.clearAction}>*/}
            {/*    Clear*/}
            {/*</ActionButton>*/}

            <ActionButton
              data-cy={'close-button'}
              variant="tertiary"
              size="small"
              leftIcon={<Close />}
              onClick={() => setShow(false)}
            >
              Close
            </ActionButton>
          </ActionButtonWrapper>
        )}
      </Wrapper>
    </WrapperButton>
  )
}

const Item = styled.div`
  display: flex;
  flex-direction: column;
`

export const DropDownRow = styled.div`
  ${({ theme }) => css`
    padding: 1rem ${theme.size.layout[1]};
  `};

  cursor: pointer;

  :hover {
    background-color: rgba(39, 63, 63, 0.05);
  }

  font-size: 0.75rem;
  font-weight: 'normal';
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.5px;
`

interface DropDownOptionProps {
  index: number
  label: string
  count: number
  value: string
}

export const DropDownOption: React.FC<DropDownOptionProps> = (props) => {
  return (
    <DropDownContext.Consumer>
      {(context) => (
        <>
          {(context.selectorType === SelectorType.CheckBox ||
            context.selectorType === SelectorType.RadioButton) && (
            <DropDownRow>
              <Checkbox
                label={props.label}
                type={context.selectorType}
                name={`${context.selectorType}-${props.index}`}
                id={`${context.selectorType}-${props.index}`}
                checked={context.checkedList.includes(props.value)}
                onCheckChange={(isSelected) => {
                  context.toggleCheckDropDown(props.value, !!isSelected)
                }}
              />
            </DropDownRow>
          )}

          {context.selectorType === SelectorType.Base && (
            <DropDownRow
              onClick={() => {
                context.toggleCheckDropDown(props.value, true)
              }}
            >
              <span>{props.label}</span>
            </DropDownRow>
          )}
        </>
      )}
    </DropDownContext.Consumer>
  )
}
