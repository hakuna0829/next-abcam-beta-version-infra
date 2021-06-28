import React, { FC, ReactElement } from 'react'
import { render } from '@testing-library/react'
import { EnvironmentProvider } from './environment/Environment.context'
import userEvent from '@testing-library/user-event'

const AllTheProviders: FC = ({ children }) => {
  return <EnvironmentProvider>{children}</EnvironmentProvider>
}

const customRender = (
  ui: ReactElement,
  options?: any // TODO, needs typing
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render, userEvent }
