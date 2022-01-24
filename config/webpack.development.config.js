// "use strict"
const path = require("path");
const Merge = require('webpack-merge');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const portfinder = require('portfinder'); // 检查端口
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); // 优化webpack输出
const COMMON_WEBPACK_CONFIG = require("./webpack.common.config");
// const notifier = require('node-notifier');
const DEVELOPMENT_WEBPACK_CONFIG = Merge.merge(COMMON_WEBPACK_CONFIG, {
    mode: "development",
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].bundle.js"
    },
    devServer: {
        open: true,
        host: 'localhost',
        hot: true,
        port: 8888,
        client: {
            overlay: true,// 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
            progress: true,
            logging: 'error', // 允许在浏览器中设置日志级别，例如在重载之前，在一个错误之前或者 热模块替换 启用时。
            overlay: {
                errors: true,
                warnings: false,
            },
        },
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({ // https://github.com/jantimon/html-webpack-plugin#options
            title: "webpack5-test-app",
            inject: "body",
            scriptLoading: "defer",
            template: "./index.html", // webpack模板的相对或绝对路径。默认情况下，src/index.ejs如果存在，它将使用。
            filename: "./index.html",
            hash: true, // 如果true然后将唯一的webpack编译哈希附加到所有包含的脚本和 CSS 文件。这对于缓存破坏很有用
            // meta: {
            //     'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
            // },
            minify: {
                caseSensitive: false, // 大小写敏感
                removeComments: true, // 去除注释
                removeEmptyAttributes: true, // 去除空属性
                collapseWhitespace: true // 去除空格
            }
        }),
    ],
    cache: {
        type: 'memory',
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    stats: 'none',
})
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = DEVELOPMENT_WEBPACK_CONFIG.devServer.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests

            process.env.PORT = port;
            // 添加port
            DEVELOPMENT_WEBPACK_CONFIG.devServer.port = port;

            DEVELOPMENT_WEBPACK_CONFIG.plugins.push(
                new FriendlyErrorsPlugin({
                    compilationSuccessInfo: {
                        messages: [`Your application is running here: http://${DEVELOPMENT_WEBPACK_CONFIG.devServer.host}:${port}`],
                        notes: ["打包 npm run build"],
                    },
                    onErrors: undefined,
                    clearConsole: true
                })
            );

            resolve(DEVELOPMENT_WEBPACK_CONFIG)
        }
    })
})
// module.exports = DEVELOPMENT_WEBPACK_CONFIG