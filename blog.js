const { withoutData } = require("./src/__mocks__/dataMock");

const ctx = "/resources";
const redirectApi = app => {
  app.get(`${ctx}/rest/withoutData`, (req, res) => {
    setTimeout(() => {
      res.status(200).send(withoutData);
    }, 5000);
  });
};

module.exports = redirectApi;
