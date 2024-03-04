const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'), // 打包后的代码放在dist目录下
    filename: '[name].[hash:8].js', // 打包的文件名
  },
  resolve: {
    // 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件
    extensions: ['.mjs','.js', '.json', '.jsx', '.ts', '.tsx'], // 如果项目中只有 tsx 或 ts 可以将其写在最前面
  },
  module: {
    rules: [
      {
        test: /.(jsx?)|(tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
              ['@babel/preset-typescript'],
              ['@babel/preset-react'],
            ],
          },
        },
      },
      {
        test: /\.(css|less)$/,
        exclude: /\.module\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'less-loader',
            options: { sourceMap: true, javascriptEnabled: true },
          },
        ],
      },
      {
        test: /\.module\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: { localIdentName: '[local]___[hash:base64:5]', exportLocalsConvention: 'camelCaseOnly' },
            },
          },
          {
            loader: 'less-loader',
            options: { sourceMap: true, javascriptEnabled: true },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          filename: 'assets/imgs/[name].[hash:8][ext]',
        },
        // use: [
        //   // {
        //   //   loader: 'file-loader',
        //   // },
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 2000,
        //       // //限制打包图片的大小：
        //       // //如果大于或等于2000Byte，则按照相应的文件名和路径打包图片；如果小于2000Byte，则将图片转成base64格式的字符串。
        //       // name: 'img/[name].[hash:8].[ext]',
        //       // //img:图片打包的文件夹；
        //       // //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
        //       // //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
        //     },
        //   },
        // ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset/resource', // 字体图标不能转化为base64, 这里使用 asset/resource
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 25 * 1024, // 25kb
        //   },
        // },
        generator: {
          filename: 'assets/fonts/[name].[contenthash][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'), // 使用自定义模板
    }),
  ],
}
