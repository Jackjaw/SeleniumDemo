const path = require('path');
const Webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

let config = {
    entry: {
        main: path.resolve('./index.js')
    },
    output: {
        filename: 'script/[name].[chunkhash:8].js',
        chunkFilename: 'script/[name].[chunkhash:8].js',
        path: path.resolve('dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@PUBLIC': path.resolve('public')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: path.resolve('node_modules'),
                use: [
                    'babel-loader',
                    './loader/react-img-src-loader'
                ]
            },
            {
                test: /^(.{0,6}|.*(?!\.external).{2}(?!\.module).{7})\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                path.resolve('public/style/variable.scss'),
                                path.resolve('public/style/placeholder.scss'),
                                path.resolve('public/style/mixin.scss')
                            ]
                        }
                    }
                ]
            },
            {
                test: /module\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                path.resolve('public/style/variable.scss'),
                                path.resolve('public/style/placeholder.scss'),
                                path.resolve('public/style/mixin.scss')
                            ]
                        }
                    }
                ]
            },
            {
                test: /external\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(html|htm)$/,
                loader: 'html-withimg-loader'
            },
            {
                test: /\.svg$/,
                include: /[\\/]icon[\\/]/,
                loader: 'svg-sprite-loader',
                options: {
                    symbolId: 'icon-[name]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: /[\\/](icon|font)[\\/]/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: '[name].[hash:7].[ext]',
                    outputPath: 'image'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: '[name].[hash:7].[ext]',
                    outputPath: 'media'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                include: /[\\/]font[\\/]/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: '[name].[ext]',
                    outputPath: 'font'
                }
            }
        ]
    },
    plugins: [
        new Webpack.ProvidePlugin({
            React: 'react',
            Component: ['react', 'Component'],
            Lazy: ['react', 'lazy'],
            Suspense: ['react', 'Suspense'],
            Link: ['react-router-dom', 'Link'],
            withRouter: ['react-router-dom', 'withRouter'],
            Loadable: 'react-loadable',
            $: 'jquery',
            jQuery: 'jquery',
            Fetch: ['@PUBLIC/script/fetch', 'default'],
            Nothing: ['@PUBLIC/component/nothing', 'default']
        }),
        new MiniCssExtractPlugin({
            filename: 'style/[name].[contenthash:8].css',
            chunkFilename: 'style/[name].[contenthash:8].css'
        }),
        new ImageminWebpackPlugin({
            bail: false,
            cache: false,
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            exclude: /[\\/](icon|font)[\\/]/,
            imageminOptions: {
                plugins: [
                    'optipng',
                    ['jpegtran', { progressive: true }],
                    ['gifsicle', { interlaced: true }],
                    'svgo'
                ]
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Demo',
            filename: 'index.html',
            template: path.resolve('./index.html'),
            favicon: path.resolve('public/favicon.ico'),
            chunks: ['manifest', 'vendor', 'main'],
            chunksSortMode: 'none'
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve('index'),
                to: '',
                ignore: ['.*']
            },
            {
                from: path.resolve('error'),
                to: 'error',
                ignore: ['.*']
            },
            {
                from: './**/*.external.js',
                to: 'script',
                ignore: ['.*'],
                flatten: true
            },
            {
                from: './**/*.external.css',
                to: 'style',
                ignore: ['.*'],
                flatten: true
            }
        ])
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 0,
                    enforce: true,
                    chunks: chunk => chunk.name === 'main'
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        },
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: true
                },
                sourceMap: false,
                cache: true,
                parallel: true
            })
        ]
    }
};

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        config.plugins.unshift(new CleanWebpackPlugin());
    }
    if (argv.mode === 'development') {
        config.output.filename = 'script/[name].js';
        config.output.chunkFilename = 'script/[name].js';
        config.plugins.push(new Webpack.HotModuleReplacementPlugin());
        config.devServer = {
            contentBase: path.resolve('index'),
            historyApiFallback: {
                rewrites: [
                    { from: /^\/?$/, to: '/index.html' },
                    { from: /^\/error\/4\d{2}$/, to: '/error/4xx.html' },
                    { from: /^\/error\/5\d{2}$/, to: '/error/5xx.html' },
                    { from: /^.+$/, to: '/error/4xx.html' }
                ]
            },
            hot: true,
            index: 'index.html',
            overlay: {
                warnings: false,
                errors: true
            },
            open: false,
            port: 3000,
            proxy: {
                '/api/': {
                    'target': 'http://localhost:3030',
                    'changeOrigin': true,
                    'pathRewrite': {
                        '^/api': ''
                    }
                }
            }
        };
    }
    return config;
};