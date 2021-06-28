import { FC } from 'react'
import { useRouter } from 'next/router'
import { Error } from '@browse/error/error'
import { useErrorsConfig } from '@browse/error/hooks/useErrorsConfig'

const ErrorPage: FC = () => {
  const errorConfig = useErrorsConfig(404)

  return <Error {...errorConfig} />
}

export default ErrorPage
