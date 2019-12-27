const path = require('path');
const WebpackIndexHTMLPlugin = require('@open-wc/webpack-index-html-plugin');

// const {
//   createDefaultConfig
// } = require('@open-wc/building-webpack');

// if you need to support IE11 use "modern-and-legacy-config" instead.
// const { createCompatibilityConfig } = require('@open-wc/building-webpack');
// module.exports = createCompatibilityConfig({
//   input: path.resolve(__dirname, './index.html'),
// });

// module.exports = createDefaultConfig({
//   input: path.resolve(__dirname, './index.html'),
// });

module.exports = {

  entry: path.resolve(__dirname, './index.js'),

  output: {
    path: path.resolve('./dist'),
    filename: 'index.js',
    chunkFilename: '[name].[chunkhash].js',
  },
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [{
        test: /\.css|\.s(c|a)ss$/,
        use: [{
          loader: 'lit-scss-loader',
          options: {
            minify: false, // defaults to false
          },
        }, 'extract-loader', 'css-loader', 'sass-loader'],
      },

      {
        test: /\.js/,
        use: {
          loader: 'babel-loader'
        }
      },
    ],
  },

  plugins: [
    new WebpackIndexHTMLPlugin({
      minify: false,

      template: () => `
        <html>
          <head>
            <link href="https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed|KoHo|Kodchasan:400,500,600|Nova+Slim|Rationale|Satisfy&display=swap" rel="stylesheet">

          </head>
          <body>
              <poster-design-element heading="Hello world!"></poster-design-element>
          </body>
        </html>
      `,
    }),
  ],
};

