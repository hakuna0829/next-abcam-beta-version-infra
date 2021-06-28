import type { FC } from 'react'
import { Error } from '@browse/error/error'
import { useRouter } from 'next/router'
import { SetErrorCode } from '@browse/store/actions/basic-actions'
import { useDispatch } from 'react-redux'
import { LoadSearchError } from '@browse/store/actions/search-result-actions'
import { route } from 'next/dist/next-server/server/router'
import { NoResult } from '@browse/components/no-result/no-result'
import { useErrorsConfig } from '@browse/error/hooks/useErrorsConfig'

const ErrorPage: FC = () => {
  const router = useRouter()

  const errorConfig = useErrorsConfig(404)

  const errorCode = router.query.code || 0
  if (+errorCode === 500) {
    return <Error {...errorConfig} />
  } else if (+errorCode === 404) {
    return <NoResult />
  } else {
    return <></>
  }
}

export default ErrorPage
