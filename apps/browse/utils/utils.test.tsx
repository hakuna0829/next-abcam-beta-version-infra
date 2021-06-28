import { getFiltersFromQueryParams, getNoResultMessage } from './index'

const queryParams = {
  'facets.application': 'WB|ICC|FC',
  'facets.categoryType': 'Primary Antibodies',
  'facets.target': 'p53',
  sorting: 'relevance',
}
const expectedResult = [
  {
    label: 'WB',
    type: 'application',
  },
  {
    label: 'ICC',
    type: 'application',
  },
  {
    label: 'FC',
    type: 'application',
  },
  {
    label: 'Primary Antibodies',
    type: 'categoryType',
  },
  {
    label: 'p53',
    type: 'target',
  },
]
describe('getFiltersFromQueryParams', () => {
  it('should parse query string with facets in queryParams', () => {
    expect(getFiltersFromQueryParams(queryParams)).toEqual(expectedResult)
  })
  it('should parse query string without in queryParams', () => {
    expect(
      getFiltersFromQueryParams({
        sorting: 'relevance',
      })
    ).toEqual([])
  })
})

const noResultExpected = 'WB ICC FC Primary Antibodies p53 test_keyword'
describe('getNoResultMessage', () => {
  it('should return no result message', () => {
    expect(getNoResultMessage(expectedResult, 'test_keyword')).toEqual(
      noResultExpected
    )
  })
})
