import { USER_LOCALE_SELECTION_KEY } from '@abcam-web/lego-shared-utils/storage/countryStorage/constants'
import { KeyValueStorage } from '@abcam-web/lego-shared-utils/storage/keyValueStorage/keyValueStorage'

export class CountryStorage {
  protected static USER_LOCALE_SELECTION = USER_LOCALE_SELECTION_KEY

  static setSelectedCountry(locale: string) {
    KeyValueStorage.setValue(this.USER_LOCALE_SELECTION, locale)
  }

  static getSelectedCountry() {
    return KeyValueStorage.getValue(this.USER_LOCALE_SELECTION)
  }
}
