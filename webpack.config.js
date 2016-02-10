var webpack = require("webpack")
var path = require("path");

module.exports = {
    entry: {
        index: "./src/index"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            { 			  
                test: /\.jsx$/,
                include: path.resolve(__dirname, "src"),         
                loader: "babel-loader",
                query: {
                    presets: ["react"] 
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins: [
        //new webpack.optimize.CommonsChunkPlugin('common', [''])
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    } 
}