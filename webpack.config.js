const path = require('path');
const PugPlugin = require('pug-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  mode: 'development',
  plugins: [
    new PugPlugin({
      entry: {
        // define many page templates here
        index: './src/index/index.pug', // => dist/index.html
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
  resolve: {
    alias: {
    "@images": path.resolve(__dirname, "./src/assets/images/"),
   }
 },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: {
      paths: ['src/**/*.*'], 
        options: {
          usePolling: true,
        },
    },
    port: 8080,
  },
  devtool: 'source-map',
  externals: {
    jquery: 'jQuery',
  }
};