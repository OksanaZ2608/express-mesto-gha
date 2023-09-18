// app.js — входной файл

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routers/index');

// const ERROR_NOT_FOUND = require('./errors/errors');
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '65080ea3e69c7a659c75bd08',
  };

  next();
});

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

// подключаем мидлвары, роуты и всё остальное...

app.use(router);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});