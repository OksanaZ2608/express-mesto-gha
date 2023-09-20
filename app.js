const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/NotFoundError');

const { login, createUser } = require('./controllers/users');
const {
  validateUserCreate,
  validateUserLogin,
} = require('./middlewares/celebrateErrors');
const validationErrorServer = require('./middlewares/validationErrorServer');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.post('/signin', validateUserLogin, login);
app.post('/signup', validateUserCreate, createUser);
app.use(auth);
app.use('/users', require('./routers/users'));
app.use('/cards', require('./routers/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());

app.use(validationErrorServer);

app.listen(PORT);
