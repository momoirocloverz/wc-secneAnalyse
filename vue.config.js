const config = require('pp-vue-components/config/vue.config')
if (!config.devServer) {
    config.devServer = {}
}
config.devServer.port = 10000
let proxy = {}

proxy[process.env.VUE_APP_SERVICE_PATH] = {
    target: 'http://10.0.2.198:8460',
    ws: true,
    changeOrigin: true
}
proxy[process.env.VUE_APP_SERVICE_PATH_WS] = {
    target: 'http://10.0.2.198:8460',
    ws: true,
    changeOrigin: true
}
config.devServer.proxy = proxy
//scss全局变量导入
config.css = {
    loaderOptions: {
        sass: {
            prependData: '@import "@/scss/settings.scss";'
        },
        // postcss: {
        //     plugins: [
        //         require('postcss-plugin-px2rem')({
        //             rootValue: 10,
        //             exclude: /(node_module)/
        //         }),
        //     ]
        // }
    }
}
//显式通过babel-loader转义文件
config.transpileDependencies = ['vuex-module-decorators', 'proxy-polyfill', 'element-ui'];

if (process.env.NODE_ENV === 'production') {
    config.configureWebpack = config => {
        config.plugins.forEach((item, i) => {
            if (item.tsconfig) {
                config.plugins.splice(i, 1);
            }
        })
    }
}

module.exports = config
