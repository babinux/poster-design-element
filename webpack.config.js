const path = require('path');
const WebpackIndexHTMLPlugin = require('@open-wc/webpack-index-html-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
  performance: {
    hints: 'warning'
  },
  // optimization: {
  //   concatenateModules: true,
  //   moduleIds: false,
  //   mangleWasmImports: true,
  //   removeAvailableModules: true,
  //   flagIncludedChunks: true,
  //   chunkIds: false,
  //   namedModules: true,
  //   namedChunks: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       cache: true,
  //       parallel: true,
  //       sourceMap: true, // Must be set to true if using source-maps in production
  //       terserOptions: {
  //         // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
  //       }
  //     }),
  //   ],
  //   splitChunks: {
  //     // chunks: 'all'
  //   },
  // },
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
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',

        ],

      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',

        ],

      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new WebpackIndexHTMLPlugin({
      minify: true,

      template: () => `
        <html>
          <head>
            <link href="https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed|KoHo|Kodchasan:400,500,600|Nova+Slim|Rationale|Satisfy&display=swap" rel="stylesheet">
            <style>
              body{
                margin:0;
              }
            </style>
          </head>
          <body>
              <poster-design-element></poster-design-element>
          </body>
        </html>
      `,
    }),
  ],
};
