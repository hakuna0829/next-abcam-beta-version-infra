export const getSearchSuggestions = (item: string) => {
  return cy.request({
    url:
      'https://test-handshake.abcam.com/exp-abcamit-search-api-v1-sit/api/v1/search/suggest',
    method: 'POST',
    headers: {
      'x-correlation-id': '2ddbd94c-96c0-4aa2-a0fe-bb7603ebca7c',
      'x-correlation-start-time': '2020-01-01T00:00:00Z',
      'x-abcam-channel-id': 'HER',
      'x-abcam-usecase-name': 'GetSearchSuggestFromElasticsearchToPWS',
      'x-abcam-channel-desc': 'PWS',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: { keywords: item, entities: [] },
  })
}
