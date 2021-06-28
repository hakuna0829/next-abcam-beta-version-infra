import { SearchStateType } from '@browse/constants'
import { Suggestion, SuggestSpellCheck } from '@browse/search/search.type'

export interface SearchStateProps {
  searchState: SearchStateType
}

export interface SearchInputProps extends SearchStateProps {
  fixAsHeader: boolean | undefined
  isAboutDisclaimerActive: boolean
  autoSuggestion: string | undefined
  suggestions: Suggestion[]
  suggestionSpellChecks: SuggestSpellCheck[]
  onFocus: () => void
  onBlur: () => void
  onSelectedOptionsChange: (selectedOptions: Suggestion[]) => void
  onInputValueChange: (value: string) => void
  setSearchState: (value: string) => void
}
