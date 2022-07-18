const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
module.exports = {
  entry: "./src/index.jsx",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new ESLintPlugin({
      fix: true,
      extensions: ["jsx"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: require.resolve("babel-loader"),
          },
        ],
        include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: "development",
  devServer: {
    static: "./dist",
  },
  resolve: {
    extensions: [".jsx", ".js"],
    alias: {
      "@": [path.resolve(__dirname, "src")],
      "@imgs": [path.resolve(__dirname, "public/imgs")],
      "@service": [path.resolve(__dirname, "src/service/service.js")],
    },
    fallback: { path: false },
  },
  devServer: {
    port: "8080",
    historyApiFallback: true,
  },
};
