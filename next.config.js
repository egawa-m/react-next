const path = require('path')
const withImages = require('next-images')
const withSass = require('@zeit/next-sass')

module.exports = withImages(
  withSass({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    },
    inlineImageLimit: 1,
    webpack (config) {
      config.module.rules.forEach(rule => {
        if (String(rule.test) === String(/\.scss$/)) {
          rule.use.push({
            loader: 'sass-resources-loader',
            options: {
              resources: [path.resolve(__dirname, './static/scss/_variables.scss'), path.resolve(__dirname, './static/scss/_mixins.scss')]
            }
          })
        }
      })
      return config
    }
  })
)