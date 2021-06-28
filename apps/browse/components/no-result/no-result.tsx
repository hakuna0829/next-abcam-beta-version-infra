import Link from 'next/link'

import type { FC } from 'react'

import styles from './no-result.module.css'
import { getNoResultMessage } from '@browse/utils'
import { useSelector } from 'react-redux'
import { getKeywords } from '@browse/store/selectors/search-result-selectors'
import { getSearch } from '@browse/store/selectors/selectors'
import { Container } from '@browse/components/container/container'
import { useEffect } from 'react'
import { Button } from '@browse/components/button'
import { useRouter } from 'next/router'

export const NoResult: FC = () => {
  const search = useSelector(getSearch)
  const keywords = useSelector(getKeywords)

  const router = useRouter()

  useEffect(() => {
    if (search?.filters?.length === 0 && !keywords) router.push(`/`)
  }, [search?.filters, keywords])

  const handleClickReturnButton = () => {
    window.location.href = `https://www.abcam.com/products?keywords=${noResultMessage.replace(
      ' ',
      '+'
    )}`
  }

  const noResultMessage = getNoResultMessage(search?.filters, keywords)
  return (
    <Container widthLimited className={styles.main}>
      <div className={styles.contentTitle}>
        We couldn't find {noResultMessage.replace(' ', ' + ')}
      </div>
      <div className={styles.description}>
        This BETA has limited functionality, please try our main website.
      </div>
      <Button onClick={handleClickReturnButton} variant={'secondary'}>
        Return to main website
      </Button>
    </Container>
  )
}
