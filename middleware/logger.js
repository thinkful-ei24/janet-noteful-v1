const express = require('express');
const app = express();

const logger = app.use((req, res, next)=>{
  const currentTime = new Date();
  const method = req.method;
  const url = req.url;
  console.log(`Time: ${currentTime}, Method: ${method}, URL REQEUESTED: ${url}`);
  next();
});

module.exports = {
  logger,
};