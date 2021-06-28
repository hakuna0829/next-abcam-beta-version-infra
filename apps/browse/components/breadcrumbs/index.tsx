import React, { FC } from 'react'
import { ReactComponent as ArrowLeft } from '@browse/assets/icons/arrow-left.svg'
import { Flex } from '@browse/components/flex'
import styled from 'styled-components'
import { grey20, spacing3 } from '@browse/public'
import { capitalize } from '@nrwl/workspace/src/utils/strings'

const Icon = styled.span`
  svg path {
    transform: scale(0.7);
  }

  svg {
    height: 14px;
    width: 14px;
  }

  padding-right: ${spacing3};
`

const LinkComponent = styled.div`
  color: ${grey20} !important;
  text-decoration: none;
  font-size: ${spacing3};
  font-weight: 'normal';
  line-height: 1.33;
  letter-spacing: 0.5px;
`

const Slash = styled.span`
  color: ${grey20};
  text-decoration: none;
  font-size: ${spacing3};
  font-weight: 'normal';
  line-height: 1.33;
  letter-spacing: 0.5px;
`

export interface Step {
  label: string
  to?: string
  callback: any
}

export interface BreadcrumbsProps {
  breadcrumbsSteps: Step[]
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadcrumbsSteps,
}) => {
  return (
    <Flex direction={'row'}>
      <Icon>
        <ArrowLeft />
      </Icon>
      {breadcrumbsSteps.map(({ label, to, callback }, index) => (
        <div key={label} onClick={callback}>
          <LinkComponent>{capitalize(label)}</LinkComponent>
          {index < breadcrumbsSteps.length - 1 && <Slash>/</Slash>}
        </div>
      ))}
    </Flex>
  )
}
