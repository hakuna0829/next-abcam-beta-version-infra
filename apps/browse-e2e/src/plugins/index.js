// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const wp = require('@cypress/webpack-preprocessor')
const { getWebpackConfig } = require('@nrwl/cypress/plugins/preprocessor')
const browserify = require('@cypress/browserify-preprocessor')
const cucumber = require('cypress-cucumber-preprocessor').default
const resolve = require('resolve')

// https://github.com/nrwl/nx/issues/1276
function preprocessTypescript(config) {
  if (!config.env.tsConfig) {
    throw new Error(
      'Please provide an absolute path to a tsconfig.json as cypressConfig.env.tsConfig'
    )
  }

  const webpackConfig = getWebpackConfig(config)

  webpackConfig.node = {
    fs: 'empty',
    child_process: 'empty',
    readline: 'empty',
  }
  webpackConfig.module.rules.push(
    {
      test: /\.feature$/,
      use: [
        {
          loader: 'cypress-cucumber-preprocessor/loader',
        },
      ],
    },
    {
      test: /\.features$/,
      use: [
        {
          loader: 'cypress-cucumber-preprocessor/lib/featuresLoader',
        },
      ],
    }
  )

  // hack to make cypress work on headless mode https://github.com/nrwl/nx/issues/2063#issuecomment-649492807
  let pending = Promise.resolve()
  return async (...args) => {
    await pending
    pending = wp({
      webpackOptions: webpackConfig,
    })(...args)
    return pending
  }
}

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // Preprocess Typescript file using Nx helper
  on('file:preprocessor', preprocessTypescript(config))
}

module.exports = (on, config) => {
  const options = {
    ...browserify.defaultOptions,
    typescript: resolve.sync('typescript', { baseDir: config.projectRoot }),
  }

  on('file:preprocessor', cucumber(options))
}
