import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { green43, greyTransparent, spacing6, white } from '@browse/public'
import { ReactComponent as ChevronUp } from '@browse/public/icons/chevron-up.svg'
import { useIntl } from 'react-intl'
import { ChevronDown } from '@abcam-web/lego-shared-components/icons'
import { testTagProp } from '@browse/common/tagging'

const Wrapper = styled.div``
const AccordionItems = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`
const AccordionItem = styled.li`
  margin: 0;
  padding: 0;
`
const AccordionHeader = styled.div`
  cursor: pointer;
  padding: 1.125rem ${spacing6};
  border-bottom: 1px solid ${greyTransparent(10)};
  color: black;
`
interface AccordionBodyProps {
  isOpen: boolean
}

const AccordionBody = styled.div<AccordionBodyProps>`
  ${({ theme }) => css`
    background-color: ${theme.color.backgroundGrey};
  `}
  transition: 0.5s;
  max-height: 0;
  overflow: hidden;
  ${({ isOpen }) =>
    isOpen &&
    `

    max-height: 1000px;

  `}
`
const AccordionLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 'normal';
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.5px;
`
const AccordionToggleIcon = styled.span`
  float: right;
`
const LabelCount = styled.span`
  background: ${green43};
  color: ${white};
  margin-left: 0.43rem;
  font-size: 0.625rem;
  padding: 0 0.375rem 1px;
  border-radius: 9px;
`

export interface IAccordionItem {
  headerLabel: string
  headerCount: number
  onToggle: (opened: boolean) => void
  render: () => JSX.Element
}

interface IAccordionItemInternal {
  isOpen: boolean
  accordionItem: IAccordionItem
}

export interface AccordionProps {
  items: IAccordionItem[]
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const intl = useIntl()
  const [accordionItems, setAccordionItems] = useState<
    IAccordionItemInternal[]
  >()
  const [openItemsIds, setOpenItemsIds] = useState<{ [key: string]: boolean }>(
    {}
  )

  useEffect(
    () =>
      setAccordionItems(
        items.map((item) => ({
          isOpen: !!openItemsIds[item.headerLabel],
          accordionItem: item,
        }))
      ),
    [items]
  )

  return (
    <Wrapper>
      <AccordionItems>
        {accordionItems?.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionHeader
              onClick={() => {
                item.accordionItem.onToggle(!item.isOpen)
                item.isOpen = !item.isOpen
                setAccordionItems([...accordionItems])
                const newOpenItemIds = { ...openItemsIds }
                newOpenItemIds[item.accordionItem.headerLabel] = item.isOpen
                setOpenItemsIds(newOpenItemIds)
              }}
            >
              <AccordionLabel {...testTagProp('accordion-label')}>
                {item.accordionItem.headerLabel}{' '}
                <LabelCount {...testTagProp('label-count')}>
                  {item.accordionItem.headerCount}
                </LabelCount>
              </AccordionLabel>
              <AccordionToggleIcon>
                {item.isOpen ? <ChevronUp /> : <ChevronDown />}
              </AccordionToggleIcon>
            </AccordionHeader>

            <AccordionBody isOpen={item.isOpen}>
              {item.accordionItem.render()}
            </AccordionBody>
          </AccordionItem>
        ))}
      </AccordionItems>
    </Wrapper>
  )
}
