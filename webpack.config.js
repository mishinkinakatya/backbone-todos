const path = require('path')

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: `./src/index`,
    output: {
        filename: `bundle.js`
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                include: [
                    path.join(__dirname, 'src'),
                ],
                use: {
                    loader: "babel-loader"
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    }
};