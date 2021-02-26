module.exports = {
    publicPath: "./",
    productionSourceMap: false,
    devServer: {
        proxy: {
            "/api": {
                target: "http://xxxx", //对应自己的接口
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            },
        }
    }
};