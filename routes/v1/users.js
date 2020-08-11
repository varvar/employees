const router = require('express').Router();
const auth = require('../../services/auth');
const UsersController = require('../../controllers/v1/users.controller');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, UsersController.create);

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, UsersController.login);

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, UsersController.current);

//GET index route (optional, everyone has access)
router.get('/', auth.optional, UsersController.index);

module.exports = router;
