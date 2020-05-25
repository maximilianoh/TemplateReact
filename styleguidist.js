const setApiUrl = require("./blog");
const path = require("path");
const styleguidist = require("react-styleguidist");
const open = require("open");
const styleguide = styleguidist({
  logger: {
    error: console.error,
    info: console.log,
    debug: console.log,
    warn: console.warn
  },
  title: "React Style Guide Example",
  components: ["src/pages/page1/Page1.jsx"],
  defaultExample: true,
  serverHost: "127.0.0.1",
  serverPort: 6065,
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.(js|jsx)?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    },
    resolve: {
      alias: {
        cJsx: path.resolve(__dirname, "src"),
        "cJsx(.*)$": path.resolve(__dirname, "src")
      }
    }
  },
  configureServer(app) {
    setApiUrl(app);
  },
  assetsDir: "devWebpackServer/"
});

styleguide.server((err, config) => {
  if (err) {
    console.log(err);
  } else {
    const url = `http://${config.serverHost}:${config.serverPort}`;
    open(url);
  }
});
