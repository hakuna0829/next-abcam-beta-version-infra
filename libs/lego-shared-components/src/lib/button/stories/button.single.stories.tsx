import React from 'react'
import { Meta } from '@storybook/react'
import { Button } from '../button'
import { STORYBOOK_CONSTANTS } from '@abcam-web/lego-shared-components/lib/button/stories/constants'

export default {
  title: 'Components/Button/Single',
  component: Button,
  argTypes: { onClick: { action: 'clicked' } },
} as Meta

const Template = (args: any) => <Button {...args} />

export const AsButton = Template.bind({}) as any
AsButton.args = {
  variant: 'primary',
  as: 'button',
  children: 'Text',
  disabled: false,
  size: 'small',
}
AsButton.argTypes = {
  variant: {
    options: STORYBOOK_CONSTANTS.variants,
    control: {
      type: 'radio',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  size: {
    options: STORYBOOK_CONSTANTS.sizes,
    control: {
      type: 'radio',
    },
  },
  href: {
    table: {
      disable: true,
    },
  },
  openInNewWindow: {
    table: {
      disable: true,
    },
  },
  as: {
    table: {
      disable: true,
    },
  },
}

export const AsLink = Template.bind({}) as any
AsLink.args = {
  variant: 'primary',
  children: 'Text',
  href: 'google.com',
  openInNewWindow: false,
  size: 'small',
  as: 'a',
}
AsLink.argTypes = {
  variant: {
    control: {
      type: 'radio',
      options: STORYBOOK_CONSTANTS.variants,
    },
  },
  openInNewWindow: {
    control: {
      type: 'boolean',
    },
  },
  size: {
    control: {
      type: 'radio',
      options: STORYBOOK_CONSTANTS.sizes,
    },
  },
  as: {
    table: {
      disable: true,
    },
  },
}
