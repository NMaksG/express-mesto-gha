const userRouter = require('express').Router();
const {
  getUsers, getUserId, createUser, updateUser, updateAvatar,
} = require('../controllers/user');

userRouter.get('/users', getUsers);
userRouter.get('/users/:userID', getUserId);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
