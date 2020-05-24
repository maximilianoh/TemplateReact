const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

let basicObjectFunction = pathComponent => {
  return {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false
            },
            exclude: /node_modules/,
            include: path.resolve(__dirname, "src")
          }
        })
      ],
      namedModules: true,
      namedChunks: true
    },

    // LOADERS
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, "src"),
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  require.resolve("babel-preset-react-app")
                ]
              }
            }
          ]
        }
      ]
    },

    // PATH RESOLVE
    resolve: {
      extensions: [".js", ".jsx"],
      modules: [path.resolve(__dirname, `src/App`), "node_modules"],
      alias: {
        cJsx: path.resolve(__dirname, "src"),
        "cJsx(.*)$": path.resolve(__dirname, "src")
      }
    },

    // Fake Api
    devServer: {
      contentBase: path.resolve(__dirname, "./devWebpackServer/"),
      watchContentBase: true,
      open: true,
      host: "127.0.0.1",
      disableHostCheck: true,
      proxy: {
        "/resources/rest/": {
          target: "http://localhost:3005",
          pathRewrite: { "^/resources/rest/": "" }
        }
      },
      historyApiFallback: {
        index: `./index.html`,
        rewrites: [
          { from: /^\/$/, to: `./index.html` },
          { from: /^\/foo/, to: `./index.html` },
          { from: /(.*)/, to: `./index.html` }
        ]
      },
      port: 3515
    }
  };
};

let getFunction = env => {
  const parameter = "App";
  let basicObject = basicObjectFunction(parameter);
  let rules = [...basicObject.module.rules];
  const pfolder = parameter.toLocaleLowerCase();
  const pCapitalize = parameter.charAt(0).toUpperCase() + parameter.slice(1);
  let mode = "production";
  let publicPath = "/";
  let filename = `${parameter}.bundle.js`;
  let entry = path.resolve(__dirname, "src");
  let plugins = [];
  if (env.development) {
    rules = [
      ...rules,
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true
        }
      },
      {
        loader: "eslint-loader",
        options: {
          fix: true,
          emitWarning: true
        }
      }
    ];
    process.env.NODE_ENV = "development";
    mode = "development";
    filename = "app.bundle.js";
    entry = entry + "/App.jsx";
  } else {
    process.env.NODE_ENV = "production";
    publicPath = `/eBanking/js/react/${parameter}/`;
    //publicPath = `eBanking/js/react/${parameter}/`;
    rules = [
      ...rules,
      {
        loader: "eslint-loader",
        options: {
          fix: true,
          emitWarning: true,
          failOnWarning: true
        }
      }
    ];

    entry = entry + `/App.jsx`;
    plugins = [
      ...plugins,
      new LoadablePlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: "static", //para que lo haga sólo al momento de hacer el build
        openAnalyzer: true //para que nos muestre el resultado inmediatamente
      })
    ];
  }

  let output = {
    path: __dirname + `/compilados/${pfolder}/`,
    filename: filename,
    chunkFilename: `${filename.split(".")[0]}[contenthash].bundle.js`,
    publicPath: publicPath
  };

  return {
    ...basicObject,
    plugins,
    module: { rules: rules },
    mode: mode,
    entry,
    output
  };
};

//"development", "test", and "production".
module.exports = (env, args) => {
  let returnValue = {};
  const smp = new SpeedMeasurePlugin();
  if (env) {
    returnValue = smp.wrap(getFunction(env));
  }
  return returnValue;
};
