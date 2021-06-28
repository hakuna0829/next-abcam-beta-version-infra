import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { store } from '@browse/store'
import { SetErrorCode } from '@browse/store/actions/basic-actions'

interface IHttpService {
  httpClient: AxiosInstance
}

abstract class HttpService implements IHttpService {
  public httpClient: AxiosInstance

  constructor() {
    this.httpClient = axios.create({
      timeout: 30000,
    })

    this.setupResponseInterceptors()
  }

  setupResponseInterceptors = () => {
    this.httpClient.interceptors.response.use(undefined, (err) => {
      if ([404, 500].indexOf(err.response.status) === 0) {
        store.dispatch(SetErrorCode(err.response.status))
      }
      return Promise.reject(err)
    })
  }
}

export { HttpService }
