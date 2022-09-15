require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;
const app = express();

const { errors, celebrate, Joi } = require('celebrate');
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const { auth } = require('./middlewares/auth');

const InternalServerError = require('./errors/InternalServerError');
const NotFoundError = require('./errors/NotFoundError');
const { createUser, login } = require('./controllers/user');

app.use(express.json());
app.use(cookieParser());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string()
      .regex(/https?:\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use(userRouter);
app.use(cardRouter);

app.use((req, res, next) => next(new NotFoundError('Запрашиваемая страница не найдена')));

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Произошла ошибка на сервере'
        : message,
    });
  next(err);
});

async function main(req, res, next) {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
    await app.listen(PORT);
    console.log(`Cервер запущен на ${PORT} порту`);
  } catch (err) {
    next(new InternalServerError('Произошла ошибка на сервере'));
  }
}

main();
