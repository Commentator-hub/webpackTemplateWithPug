const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

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
        main: path.resolve('./src/app.js')

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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: [path.resolve(__dirname, "dist")],
        port: 8080,
        open: true,
        watchContentBase: true
    },
    module: {
        rules: [
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
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
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
        extensions: ['.js', '.json', '.png', '.scss']
    },
}