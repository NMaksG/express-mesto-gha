const User = require('../models/user');

const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../errors');

module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
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
    return res.send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
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
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
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
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};
