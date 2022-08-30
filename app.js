const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
// app.use('/users', require('./routes/user'));

const router = require('./routes/user');

app.use((req, res, next) => {
  req.user = {
    _id: '630d915c97a0fd05df49c372',
  };

  next();
});

app.use(router);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await app.listen(PORT);
  console.log(`Cервер запущен на ${PORT} порту`);
}

main();

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

// app.listen(PORT, () => {
//   console.log(`Сервер запущен на ${PORT} порту`);
// });
