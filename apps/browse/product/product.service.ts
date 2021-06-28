import { HttpService } from '@browse/services/http.service'

class ProductService extends HttpService {
  constructor() {
    super()
    this.httpClient.defaults.baseURL =
      'https://test-handshake.abcam.com/exp-abcamit-product-details-api-v1-sit/api/v1'
    this.httpClient.defaults.headers = {
      'x-correlation-id': '19de611d-7580-4c60-befd-12378bbf96fd',
      'x-correlation-start-time': '2018-08-02T16:58:12.121Z',
      'x-abcam-channel-id': 'HER',
      'x-abcam-usecase-name': 'GetKeyFactsFromMagentoToPWS',
      'x-abcam-channel-desc': 'PWS',
    }
  }

  public getSummary(productCode: string) {
    return this.httpClient.get(`/product/${productCode}/summary`)
  }

  public getDatasheet(productCode: string) {
    return this.httpClient.get(`/product/${productCode}/datasheet`)
  }

  public getImages(
    productCode: string,
    applicationId?: string,
    taxonId?: string
  ) {
    return this.httpClient.get(`/product/${productCode}/images`, {
      params: { applicationId: applicationId, taxonId: taxonId },
    })
  }

  public getKeyfacts(productCode: string) {
    return this.httpClient.get(`/product/${productCode}/keyFacts`)
  }

  public getPublications(
    productCode: string,
    applicationId?: string,
    taxonId?: string
  ) {
    const params = {
      ...(applicationId ? { applicationId: applicationId } : {}),
      ...(taxonId ? { taxonId: taxonId } : {}),
    }

    return this.httpClient.get(`/product/${productCode}/publications`, {
      params: params,
    })
  }

  public getReactivity(productCode: string) {
    return this.httpClient.get(`/product/${productCode}/reactivity`)
  }

  public getSupport(productCode: string) {
    return this.httpClient.get(`/product/${productCode}/support`)
  }

  public getTargetSynonyms(productCode: string) {
    return this.httpClient.get(`/product/${productCode}/targetSynonyms`)
  }

  public getAvailability(productCode: string) {
    return this.httpClient.get(`/product/${productCode}/availability`)
  }
}

const productService = new ProductService()

export { productService as ProductService }
