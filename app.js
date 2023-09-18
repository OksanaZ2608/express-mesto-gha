const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedtopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '',
  };
  next();
});

app.use('/users', require('./routers/users'));
app.use('/cards', require('./routers/cards'));

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Такая страница не найдена' });
});

app.listen(PORT);