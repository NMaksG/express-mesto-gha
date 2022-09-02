const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require('./errors');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '630d915c97a0fd05df49c372',
  };

  next();
});

app.use(userRouter);
app.use(cardRouter);

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Запрашиваемая страница не найдена' });
});

async function main(req, res) {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
    await app.listen(PORT);
    console.log(`Cервер запущен на ${PORT} порту`);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
}

main();
