const path = require('path');
const webpack = require('webpack');
const DIST_DIR   = path.join(__dirname, 'dist'),  
    CLIENT_DIR = path.join(__dirname, 'src'); 

const Dotenv = require('dotenv-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
 
module.exports = {
    context: CLIENT_DIR,
    entry: ['./app.jsx', './scss/main.scss'],
    output: { 
        path: DIST_DIR, 
        filename: 'bundle.js' 
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2017', 'react'],
                    plugins: ['transform-class-properties']
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new Dotenv({
            path: './.env'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new ExtractTextPlugin({
            filename: '../dist/main.css',
            allChunks: true
        })
    ]
};