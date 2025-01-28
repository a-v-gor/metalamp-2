const path = require('path');
const PugPlugin = require('pug-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  mode: 'development',
  plugins: [
    new PugPlugin({
      entry: {
        index: './src/index/index.pug',
        'ui-kit': './src/ui-kit/ui-kit.pug',
        'website-pages': './src/website-pages/website-pages.pug',
        'landing-page': './src/landing-page/landing-page-with-card-find-room.pug',
        'landing-page-with-date': './src/landing-page/landing-page-with-card-date.pug',
        'landing-page-with-guests': './src/landing-page/landing-page-with-guests.pug',
        'search-room-filter': './src/search-room-filter/search-room-filter.pug',
        'search-room-preferences': './src/search-room-preferences/search-room-preferences.pug',
        'search-room-expand': './src/search-room-expand/search-room-expand.pug',
      },
      js: {
        // JS output filename
        filename: 'js/[name].[contenthash:8].js',
      },
      css: {
        // CSS output filename
        filename: 'css/[name].[contenthash:8].css',
      },
    }),
    new StylelintPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(s?css|sass)$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.(ico|png|jp?g|webp|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext][query]',
        },
      },
      {
        // To use fonts on pug files:
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]'
        }
      }
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: {
      paths: ['src/**/*'], 
        options: {
          usePolling: true,
        },
    },
    port: 8080,
  },
  devtool: 'source-map'
};