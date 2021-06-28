import { useEffect, useState } from 'react'
import { Button } from '@browse/components/button'
import styles from '@browse/error/error.module.css'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { LoadSearchError } from '@browse/store/actions/search-result-actions'
import { ErrorConfig } from '@browse/error/entity/entity.type'

export function useErrorsConfig(errorCode: number) {
  const router = useRouter()

  const dispatch = useDispatch()

  const [errorConfig, setErrorConfig] = useState({
    title: '',
    button: null,
    description: '',
    movedDescription: '',
  } as ErrorConfig)

  type Code = 404 | 500

  type Errors = { [key in Code]: ErrorConfig }

  function clearStore() {
    dispatch(LoadSearchError(undefined))
    router.push(`/`)
  }

  const errors: Errors = {
    404: {
      title: 'Oops...',
      description: 'Something unexpected happened',
      movedDescription:
        'The page you were looking for either no longer exists or has been moved.',
      button: (
        <Button
          variant="primary"
          leftIcon={
            <span className="f1y0vpl6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                fill="none"
                viewBox="0 0 24 25"
              >
                <path
                  fill="#273F3F"
                  fill-rule="evenodd"
                  d="M2.386 8.712l9-7c.361-.281.867-.281 1.228 0l9 7c.244.189.386.48.386.789v11c0 1.657-1.343 3-3 3H5c-1.657 0-3-1.343-3-3v-11c0-.309.142-.6.386-.79zM10 21.5h4v-8h-4v8zm6 0v-9c0-.552-.448-1-1-1H9c-.552 0-1 .448-1 1v9H5c-.552 0-1-.448-1-1V9.99l8-6.222 8 6.222V20.5c0 .553-.448 1-1 1h-3z"
                />
              </svg>
            </span>
          }
          onClick={clearStore}
        >
          <div className={styles.btnLabel}>Go home</div>
        </Button>
      ),
    },
    500: {
      title: 'Oops...',
      description: 'Someone at our end didn’t follow the protocol',
      movedDescription:
        'It looks like the server encountered an error and couldn’t complete your request. The problem has been reported and we’re working on a solution.',
      button: (
        <Button
          variant="primary"
          leftIcon={
            <span className="f1y0vpl6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#273F3F"
                  fill-rule="evenodd"
                  d="M17.653 6.347l.73.653H15c-.552 0-1 .448-1 1s.448 1 1 1h6c.552 0 1-.448 1-1V2c0-.552-.448-1-1-1s-1 .448-1 1v3.765l-.974-.87c-2.386-2.39-5.89-3.404-9.238-2.646-3.35.758-6.075 3.18-7.22 6.417-.185.521.088 1.092.608 1.277.521.184 1.092-.089 1.277-.61.916-2.589 3.097-4.527 5.776-5.133 2.68-.607 5.482.204 7.424 2.147zM4 18.235V22c0 .552-.448 1-1 1s-1-.448-1-1v-6c0-.552.448-1 1-1h6c.552 0 1 .448 1 1s-.448 1-1 1H5.617l.73.653c1.942 1.943 4.745 2.754 7.424 2.147 2.68-.606 4.86-2.544 5.776-5.134.184-.52.756-.793 1.277-.609.52.184.793.756.609 1.277-1.146 3.236-3.872 5.66-7.22 6.417-3.35.758-6.853-.256-9.24-2.646L4 18.235z"
                />
              </svg>
            </span>
          }
          onClick={() => window.history.back()}
        >
          <div className={styles.btnLabel}>Try again</div>
        </Button>
      ),
    },
  }

  useEffect(() => {
    setErrorConfig(errors[errorCode as Code])
  }, [errorCode])

  return errorConfig
}
