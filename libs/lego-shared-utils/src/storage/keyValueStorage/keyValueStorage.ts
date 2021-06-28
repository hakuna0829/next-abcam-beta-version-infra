import Cookies from 'universal-cookie'

export class KeyValueStorage {
  static COOKIES_PARAMS = {
    path: '/',
    domain: '.abcam.com',
  }

  private static validateStorageKeyValue(key: unknown, value: unknown) {
    if (typeof key !== 'string') {
      throw Error(
        `The storage key must be a string. You passed ${key}, which is of type ${typeof key}`
      )
    }

    if (typeof value !== 'string') {
      throw Error(
        `The storage value must be a string. You passed ${value}, which is of type ${typeof value}`
      )
    }
  }

  static setValue(
    storageKey: string,
    value: string,
    params = this.COOKIES_PARAMS
  ) {
    this.validateStorageKeyValue(storageKey, value)
    new Cookies().set(storageKey, value, params)
  }

  static getValue(storageKey: string) {
    return new Cookies().get(storageKey)
  }

  static getAllValues() {
    return new Cookies().getAll()
  }

  static deleteValue(valueKey: string) {
    return new Cookies().remove(valueKey)
  }
}
