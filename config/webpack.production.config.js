"use strict"
const path = require("path");
const webpack = require('webpack'); // 访问内置的插件
const Merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const COMMON_WEBPACK_CONFIG = require("./webpack.common.config");
const PRODUCTION_WEBPACK_CONFIG = Merge.merge(COMMON_WEBPACK_CONFIG, {
    mode: "production",
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].[contenthash].bundle.js"
    },
    devtool: "hidden-source-map",
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({ // https://github.com/jantimon/html-webpack-plugin#options
            title: "webpack5-test-app",
            inject: "body",
            scriptLoading: "defer",
            template: "./index.html", // webpack模板的相对或绝对路径。默认情况下，src/index.ejs如果存在，它将使用。
            filename: "./index.html",
            hash: true, // 如果true然后将唯一的webpack编译哈希附加到所有包含的脚本和 CSS 文件。这对于缓存破坏很有用
            minify: {
                caseSensitive: false, // 大小写敏感
                removeComments: true, // 去除注释
                removeEmptyAttributes: true, // 去除空属性
                collapseWhitespace: true // 去除空格
            }
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    }
});
module.exports = PRODUCTION_WEBPACK_CONFIG;