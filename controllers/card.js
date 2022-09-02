const Card = require('../models/card');

const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../errors');

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({ name, link, owner });
    return res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      return res
        .status(NOT_FOUND)
        .send({ message: 'Запрашиваемая карточка не найдена' });
    }
    return res.send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!card) {
      return res
        .status(NOT_FOUND)
        .send({ message: 'Запрашиваемая карточка не найдена' });
    }
    return res.send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!card) {
      return res
        .status(NOT_FOUND)
        .send({ message: 'Запрашиваемая карточка не найдена' });
    }
    return res.send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};
