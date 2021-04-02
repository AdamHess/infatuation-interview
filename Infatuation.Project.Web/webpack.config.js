
const path = require('path');
const webpack =require('Webpack');
module.exports = {
    mode: 'development',
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'wwwroot/js'),
        filename: 'main.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jQuery",
            jQuery: "jQuery"
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
                type: 'asset',
            },
        { test: /\.hbs/, loader: "handlebars-loader" }

        ]
    },
    externals: {
        jquery: 'jQuery',
        handlebars: 'Handlebars',
        lodash: "_"
    },
};
