var path = require('path')
var webpack = require('webpack')

module.exports = {
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    devtool: 'cheap-module-source-map',
    // devtool: 'eval',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015,plugins[]=transform-object-rest-spread'],
            exclude: /node_modules/,
            include: path.join(__dirname, 'src')
        },
            //SASS
            {
                test: /\.scss$/,
                loader: 'style!css!sass?sourceMap',
                exclude: /node_modules/
            }]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true, compress: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin()
    ]
}