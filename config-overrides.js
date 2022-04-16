
module.exports = function override(config, env) {
    return {
        ...config,
        module:{
            rules: [
                {
                  test: /\.css$/,
                  use: [
                    'style-loader',
                    {
                      loader: 'css-loader',
                      options: {
                        importLoaders: 1
                      }
                    },
                    'postcss-loader'
                  ]
                },{
                    test:/\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                          presets: ['@babel/preset-typescript','@babel/preset-react']
                        }
                    }
                },{
                    test:/\.svg$/,
                    use:{
                        loader:"svg-url-loader",
                        options:{
                            limit: 10000,
                        },
                    }
                }
              ],
        },
        resolve:{
            extensions: ['.ts', '.tsx', '.js', '.json']
        },      
        output:{
            filename:"static/js/dhedge-widget.js",
            chunkFilename:"static/js/dhedge-widget.[name].js",
            path:"/build",
            pathinfo: false,
            publicPath:"/",
            chunkLoadingGlobal: "webpackJsonpfrontend-widget",
            globalObject: "this"
        }
    }
}

