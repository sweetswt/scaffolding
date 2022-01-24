// Generated using webpack-cli https://github.com/webpack/webpack-cli

// const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = process.env.NODE_ENV == "production";
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack'); // 访问内置的插件
const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/main.ts",
  // entry: {
  //   main: './src/main.ts',
  //   vendor: './src/vendor.ts', // vendor.js 中存入未做修改的必要 library 或文件（例如 Bootstrap, jQuery, 图片等），然后将它们打包在一起成为单独的 chunk。内容哈希保持不变，这使浏览器可以独立地缓存它们，从而减少了加载时间。
  // },
  // output: {
  //   publicPath: "/",
  //   path: path.resolve(__dirname, "dist"),
  //   filename: "[name].[contenthash].bundle.js"
  // },
  plugins: [
    // Add your plugins here
    new webpack.ProgressPlugin(), // ProgressPlugin 用于自定义编译过程中的进度报告
    new VueLoaderPlugin(),

    // new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
      {
        test: /\.(js|jsx)$/i,

        loader: "babel-loader",
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [ // 单文件组件会被vue-loader解析成三个部分，script部分最终交给ts-loader去处理,ts不知道如何处理.vue文件结尾的文件 会报错,所以需要加这个选项。
            /\.vue$/
          ]
        }
      },

      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.(png|svg|jpe?g)$/i, // 不要把字体也用 url-loader 来处理，把字体文件转成base64是浏览器无法识别的
        loader: 'url-loader', // 允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 file-loader 处理。
        options: {
          esModule: false
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2|gif)$/i,
        loader: 'file-loader', // 可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存。
        options: {
          esModule: false
        }
      },

    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.vue',
      '.tsx',
      '.ts'
    ],
    alias: {
      "vue$": "vue/dist/vue.esm.js",
      // "@": resolve("src"),
      // "@public": resolve("public")
    }
  },
};
module.exports = config;
