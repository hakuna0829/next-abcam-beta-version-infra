import type { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { SetSearchFixed } from '@browse/store/actions/search-actions'
import { SetIsHomePage } from '@browse/store/actions/basic-actions'
import { getErrorCode } from '@browse/store/selectors/search-result-selectors'
import { useRouter } from 'next/router'

const Home: FC = () => {
  const errorCode = useSelector(getErrorCode)

  const router = useRouter()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(SetSearchFixed(false))
    dispatch(SetIsHomePage(true))

    return () => {
      dispatch(SetSearchFixed(true))
      dispatch(SetIsHomePage(false))
    }
  }, [])

  useEffect(() => {
    if ([404, 500].includes(errorCode)) {
      router.push(`/error/${errorCode}`)
    }
  }, [errorCode])

  return (
    <main className="absolute flex-1 w-screen h-screen bg-main bg-grey60 z-homepage"></main>
  )
}

export default Home
