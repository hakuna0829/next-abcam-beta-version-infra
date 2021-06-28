import { PreviousSearch } from '@browse/store/reducers/search-reducer'

export interface PreviousSearchesProps {
  onPreviousSearchSelected: (search: PreviousSearch) => void
}
