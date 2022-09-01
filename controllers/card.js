const Card = require('../models/card');

const OK = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({ name, link, owner });
    return res.status(OK).send(card);
  } catch (err) {
    if (err.errors.name.name === 'ValidatorError') {
      return res.status(BAD_REQUEST).send({ message: 'Ошибка в запросе', ...err });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере', ...err });
  }
};

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(OK).send(cards);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере', ...err });
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
    return res.status(OK).send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(BAD_REQUEST).send({ message: 'Невалидный Id карточки', ...err });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере', ...err });
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
    return res.status(OK).send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(BAD_REQUEST).send({ message: 'Невалидный Id карточки', ...err });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере', ...err });
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
    return res.status(OK).send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(BAD_REQUEST).send({ message: 'Невалидный Id карточки', ...err });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере', ...err });
  }
};
