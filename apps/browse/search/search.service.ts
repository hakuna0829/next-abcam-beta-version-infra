import { HttpService } from '@browse/services/http.service'
import { AxiosResponse } from 'axios'
import {
  RecommendedFacetsRequest,
  RecommendedFacetsResponse,
  SuggestRequest,
  SuggestResponse,
  Sorting,
  Filter,
} from '@browse/search/search.type'

class SearchService extends HttpService {
  constructor() {
    super()
    this.httpClient.defaults.baseURL =
      'https://test-handshake.abcam.com/exp-abcamit-search-api-v1-sit/api/v1'
    this.httpClient.defaults.headers = {
      'x-correlation-id': '2ddbd94c-96c0-4aa2-a0fe-bb7603ebca7c',
      'x-correlation-start-time': '2020-01-01T00:00:00Z',
      'x-abcam-channel-id': 'HER',
      'x-abcam-usecase-name': 'GetSearchSuggestFromElasticsearchToPWS',
      'x-abcam-channel-desc': 'PWS',
      'Content-Type': 'application/json;charset=UTF-8',
    }
  }

  public getResults(keywords: string, facets: Filter[]) {
    return this.httpClient.post('/search', {
      keywords: keywords ?? '',
      sort: 'relevance',
      facets,
      offset: 0,
      limit: 20,
    })
  }

  public getSearch(
    keywords: string,
    sort: string,
    facets: Filter[],
    offset: number,
    limit: number
  ) {
    return this.httpClient.post(`/search`, {
      keywords,
      sort,
      facets,
      offset,
      limit,
    })
  }

  public getRecommendedFacets(payload: RecommendedFacetsRequest) {
    return this.httpClient.post<
      RecommendedFacetsRequest,
      AxiosResponse<RecommendedFacetsResponse>
    >(`/search/recommendedFacets`, payload)
  }

  public getSuggest(payload: SuggestRequest) {
    return this.httpClient.post<SuggestRequest, AxiosResponse<SuggestResponse>>(
      `/search/suggest`,
      payload
    )
  }
}

const searchService = new SearchService()

export { searchService as SearchService }
