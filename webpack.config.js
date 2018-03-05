const webpack = require('webpack')
var path = require('path')

module.exports = {

  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'tuogame.js',
    library: 'tuogame',
    libraryTarget: 'umd'
  },

  entry:{
    index: path.resolve(__dirname, './src')
  },

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom':{
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom'
    }
  },

  module: {
    loaders: [
      { test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        }
      }
    ]
  },

  node: {
    Buffer: false
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]

}
