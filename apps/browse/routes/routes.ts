import type { Link } from './routes.types'

const routes = {
  product: {
    overview(productCode: string): Link {
      return {
        href: '/product/[productCode]/overview/all',
        as: `/product/${productCode}/overview/all`,
      }
    },
    datasheet(productCode: string): Link {
      return {
        href: '/product/[productCode]/datasheet',
        as: `/product/${productCode}/datasheet`,
      }
    },
    support(productCode: string): Link {
      return {
        href: '/product/[productCode]/support',
        as: `/product/${productCode}/support`,
      }
    },
    validationApplications(productCode: string, applicationId: string): Link {
      return {
        href: '/product/[productCode]/overview/[applicationId]',
        as: `/product/${productCode}/overview/${applicationId}`,
      }
    },
  },
  search: {
    quickview(): Link {
      return {
        href: '/search/detail/quick-view',
        as: `/product/detail/quick-view`,
      }
    },
    publications(): Link {
      return {
        href: '/search/detail/publications',
        as: `/product/detail/publications`,
      }
    },
  },
}

export { routes }
