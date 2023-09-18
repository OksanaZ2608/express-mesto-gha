const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
// const ERROR_NOT_FOUND = require('../errors/errors');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res) => {
  res.status(404).send({ message: 'Такая страница не найдена' });
});

module.exports = router;
