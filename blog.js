const {
  dataSeleccionableSumador,
  dataSeleccionableSubmit,
  simpleData,
  withoutData,
  dataSeleccionableSearch,
  dataPagination,
  dataString,
  dataNumber,
  buttonsData,
  imgData,
  errorData
} = require("./src/__mocks__/dataMock");

const ctx = "/resources";
const redirectApi = app => {
  app.get(`${ctx}/rest/withoutData`, (req, res) => {
    setTimeout(() => {
      res.status(200).send(withoutData);
    }, 5000);
  });
  app.get(`${ctx}/rest/simpleData`, (req, res) => {
    res.status(200).send(simpleData);
  });
  app.get(`${ctx}/rest/dataSeleccionableSumador`, (req, res) => {
    res.status(200).send(dataSeleccionableSumador);
  });
  app.get(`${ctx}/rest/dataSeleccionableSubmit`, (req, res) => {
    res.status(200).send(dataSeleccionableSubmit);
  });
  app.get(`${ctx}/rest/dataSeleccionableSearch`, (req, res) => {
    res.status(200).send(dataSeleccionableSearch);
  });
  app.get(`${ctx}/rest/dataPagination`, (req, res) => {
    res.status(200).send(dataPagination);
  });
  app.get(`${ctx}/rest/dataString`, (req, res) => {
    res.status(200).send(dataString);
  });
  app.get(`${ctx}/rest/dataNumber`, (req, res) => {
    res.status(200).send(dataNumber);
  });
  app.get(`${ctx}/rest/buttonsData`, (req, res) => {
    res.status(200).send(buttonsData);
  });

  app.get(`${ctx}/rest/imgData`, (req, res) => {
    res.status(200).send(imgData);
  });

  app.get(`${ctx}/rest/errorData`, (req, res) => {
    res.status(200).send(errorData);
  });
};

module.exports = redirectApi;
