import {
  CountryStorage,
  KeyValueStorage,
} from '@abcam-web/lego-shared-utils/storage'
import { USER_LOCALE_SELECTION_KEY } from '@abcam-web/lego-shared-utils/storage/countryStorage/constants'

jest.mock(
  '@abcam-web/lego-shared-utils/storage/keyValueStorage/keyValueStorage'
)

describe('The CountryStorage class', () => {
  describe('When the setSelectedCountry is called', () => {
    it('Stores the selected country', () => {
      CountryStorage.setSelectedCountry('test')
      expect(KeyValueStorage.setValue).toHaveBeenCalledWith(
        USER_LOCALE_SELECTION_KEY,
        'test'
      )
    })
  })

  describe('When the getSelectedCountry is called', () => {
    it('Stores the selected country', () => {
      KeyValueStorage.getValue = jest.fn().mockReturnValue('spain')
      const res = CountryStorage.getSelectedCountry()
      expect(KeyValueStorage.getValue).toHaveBeenCalledWith(
        USER_LOCALE_SELECTION_KEY
      )
      expect(res).toBe('spain')
    })
  })
})
