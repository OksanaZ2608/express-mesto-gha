const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const routes = require('./routers/index');

const validationErrorServer = require('./middlewares/validationErrorServer');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});
app.use(routes);
app.use(errors());
app.use(validationErrorServer);
app.listen(PORT);
