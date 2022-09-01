const User = require('../models/user');

const OK = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    return res.status(OK).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(BAD_REQUEST).send({ message: 'Ошибка в запросе' });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере', ...err });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(OK).send(users);
  } catch {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

module.exports.getUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);
    if (!user) {
      return res
        .status(NOT_FOUND)
        .send({ message: 'Запрашиваемый пользователь не найден' });
    }
    return res.status(OK).send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(BAD_REQUEST).send({ message: 'Невалидный Id пользователя', ...err });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере', ...err });
  }
};

module.exports.updateUser = async (req, res) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      return res
        .status(NOT_FOUND)
        .send({ message: 'Запрашиваемый пользователь не найден' });
    }
    return res.status(OK).send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(BAD_REQUEST).send({ message: 'Невалидный Id пользователя', ...err });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере', ...err });
  }
};

module.exports.updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      return res
        .status(NOT_FOUND)
        .send({ message: 'Запрашиваемый пользователь не найден' });
    }
    return res.status(OK).send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(BAD_REQUEST).send({ message: 'Невалидный Id пользователя', ...err });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере', ...err });
  }
};
