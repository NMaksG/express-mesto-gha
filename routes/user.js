const userRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getUsers, getUserId, updateUser, updateAvatar, getUserMe,
} = require('../controllers/user');

userRouter.get('/users', getUsers);
userRouter.get('/users/me', getUserMe);
userRouter.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserId);
userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), updateAvatar);

module.exports = userRouter;
