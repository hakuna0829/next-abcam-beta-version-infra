import { KeyValueStorage } from '@abcam-web/lego-shared-utils/storage/keyValueStorage/keyValueStorage'

const testCookieParams = {
  path: '/',
  domain: 'localhost',
}

describe('The Storage class', () => {
  const fakeStorageKey = 'myFakeKey'
  beforeEach(() => {
    KeyValueStorage.deleteValue(fakeStorageKey)
  })

  describe('The setValue method', () => {
    describe('When called with a key and value', () => {
      it('Saves the selected locale as a cookie', () => {
        const fakeValue = 'blabla'
        KeyValueStorage.setValue(fakeStorageKey, fakeValue, testCookieParams)
        expect(document.cookie).toEqual(`${fakeStorageKey}=${fakeValue}`)
      })

      it('Only keeps the latest value if called multiple times', () => {
        const firstFakeValue = 'blabla'
        const secondFakeValue = 'secondFakevalue'
        KeyValueStorage.setValue(
          fakeStorageKey,
          firstFakeValue,
          testCookieParams
        )
        KeyValueStorage.setValue(
          fakeStorageKey,
          secondFakeValue,
          testCookieParams
        )
        expect(document.cookie).toEqual(`${fakeStorageKey}=${secondFakeValue}`)
      })
    })

    describe('When called with a key that is not a string', () => {
      it('Errors when it is a number', () => {
        const wrongKey = (3 as unknown) as string
        expect(() => KeyValueStorage.setValue(wrongKey, 'blabla')).toThrow(
          `The storage key must be a string. You passed ${wrongKey}, which is of type ${typeof wrongKey}`
        )
      })

      it('Errors when it is an object', () => {
        const wrongKey = ({ test: true } as unknown) as string
        expect(() => KeyValueStorage.setValue(wrongKey, 'blabla')).toThrow(
          `The storage key must be a string. You passed ${wrongKey}, which is of type ${typeof wrongKey}`
        )
      })

      it('Errors when it is undefined', () => {
        const wrongKey = (undefined as unknown) as string
        expect(() => KeyValueStorage.setValue(wrongKey, 'blabla')).toThrow(
          `The storage key must be a string. You passed ${wrongKey}, which is of type ${typeof wrongKey}`
        )
      })

      it('Errors when it is null', () => {
        const wrongKey = (null as unknown) as string
        expect(() => KeyValueStorage.setValue(wrongKey, 'blabla')).toThrow(
          `The storage key must be a string. You passed ${wrongKey}, which is of type ${typeof wrongKey}`
        )
      })
    })

    describe('When called with a value that is not a string', () => {
      it('Errors when it is a number', () => {
        const key = 'test'
        const wrongVal = (3 as unknown) as string
        expect(() => KeyValueStorage.setValue(key, wrongVal)).toThrow(
          `The storage value must be a string. You passed ${wrongVal}, which is of type ${typeof wrongVal}`
        )
      })

      it('Errors when it is an object', () => {
        const key = 'test'
        const wrongVal = ({ test: true } as unknown) as string
        expect(() => KeyValueStorage.setValue(key, wrongVal)).toThrow(
          `The storage value must be a string. You passed ${wrongVal}, which is of type ${typeof wrongVal}`
        )
      })

      it('Errors when it is undefined', () => {
        const key = 'test'
        const wrongVal = (undefined as unknown) as string
        expect(() => KeyValueStorage.setValue(key, wrongVal)).toThrow(
          `The storage value must be a string. You passed ${wrongVal}, which is of type ${typeof wrongVal}`
        )
      })

      it('Errors when it is null', () => {
        const key = 'test'
        const wrongVal = (null as unknown) as string
        expect(() => KeyValueStorage.setValue(key, wrongVal)).toThrow(
          `The storage value must be a string. You passed ${wrongVal}, which is of type ${typeof wrongVal}`
        )
      })
    })
  })

  describe('The getValue method', () => {
    it('Returns the value for the given key', () => {
      const fakeValue = 'blabla'
      KeyValueStorage.setValue(fakeStorageKey, fakeValue, testCookieParams)
      const res = KeyValueStorage.getValue(fakeStorageKey)
      expect(res).toBe(fakeValue)
    })

    it('Respects the domain passed as a parameter ', () => {
      const fakeValue = 'blabla'
      KeyValueStorage.setValue(fakeStorageKey, fakeValue, {
        path: '/',
        domain: 'abcam.com',
      })
      expect(KeyValueStorage.getValue(fakeStorageKey)).toBe(undefined)

      KeyValueStorage.setValue(fakeStorageKey, fakeValue, {
        path: '/',
        domain: 'localhost',
      })
      expect(KeyValueStorage.getValue(fakeStorageKey)).toBe(fakeValue)
    })
  })
})
