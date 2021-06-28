// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx')

module.exports = withNx({
  i18n: {
    locales: ['en-gb', 'en-kr', 'en-de', 'en-il'],
    defaultLocale: 'en-gb',
  },
  publicRuntimeConfig: {
    GRAPHQL_AUTHORIZATION: process.env.GRAPHQL_AUTHORIZATION,
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
    GRAPHQL_HOST_URI: process.env.GRAPHQL_HOST_URI,
    HOST_URI: process.env.HOST_URI,
    IMAGES_URI: process.env.IMAGES_URI,
    STAGE: process.env.STAGE,
    HOTJAR_SURVEY: process.env.HOTJAR_SURVEY,
    ELOQUA_URL: process.env.ELOQUA_URL,
  },
})
