import { createContext, useContext } from 'react'
import getConfig from 'next/config'

import type { Environment } from './environment.type'
import type { ReactNode } from 'react'

const { publicRuntimeConfig } = getConfig()

export const EnvironmentContext = createContext<Environment | undefined>(
  undefined
)

export const EnvironmentProvider = (props: {
  children: ReactNode
}): React.ReactElement => {
  return <EnvironmentContext.Provider value={publicRuntimeConfig} {...props} />
}

export function useEnvironment(): Environment {
  const value = useContext(EnvironmentContext)
  if (value === undefined) throw new Error('no value provided')
  return value
}
