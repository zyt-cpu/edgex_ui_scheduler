module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://172.17.176.204:4000/support-scheduler', //服务端地址
                ws: true,
                changeOrigin: true, // 允许跨域
                pathRewrite: {
                    '^/api': ''   // 标识替换，使用 '/api' 代替真实的接口地址
                }
            }
        }
    }
}
