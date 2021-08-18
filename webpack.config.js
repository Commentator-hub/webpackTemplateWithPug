const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const isDev = process.env.NODE_ENV === 'development'

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = loader => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        'css-loader',
        'resolve-url-loader'
    ]

    if (loader) {
        loaders.push(loader)
    }

    return loaders
}


module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: {
        main: path.resolve(__dirname, 'src/app.js')

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            minify: false,
            template: path.resolve(__dirname, './src/pug/index.pug')
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new SpriteLoaderPlugin({
            plainSprite: true
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        port: 8080,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.svg$/, // your icons directory
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: 'sprite.svg',
                    runtimeCompat: true,// this is the destination of your sprite sheet,
                    output: './src/static/images/svg/sprite.svg'
                }
            },

            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders({
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                })
            },
            {
                test: /\.pug$/,
                use: ['pug-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.png', '.scss', 'jpg', 'jpeg', '.svg']
    },
}