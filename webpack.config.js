module.exports = [
    {
      entry: './src/index.js',
      output: {
        libraryTarget: 'umd',
        library: 'rdtas',
        filename: 'rdtas.min.js'
      },
      module : {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
      },
      optimization: { minimize: true },
      mode: 'production'
    },
    {
        entry: './src/index.js',
        output: {
            libraryTarget: 'umd',
            library: 'rdtas',
            filename: 'rdtas.js'
        },
        module : {
            rules: [
                { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
            ]
        },
        optimization: { minimize: false },
        mode: 'production'
    }
]
