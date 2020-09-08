const path = require('path')

module.exports = {
    // devtool: 'none',
    devtool: 'source-map',
    mode: 'development',
    entry: `./src/index.js`,
    output: {
        filename: `bundle.js`
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    path.join(__dirname, 'src'),
                ],
                use: {
                    loader: "babel-loader"
                }
            },
        ]
    }
};