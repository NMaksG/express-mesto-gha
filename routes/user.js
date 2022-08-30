const router = require('express').Router();
const { getUsers, getUserID, createUsers } = require('../controllers/user');

router.get('/users', getUsers);
router.get('/users/:userID', getUserID);
router.post('/users', createUsers);

module.exports = router;
