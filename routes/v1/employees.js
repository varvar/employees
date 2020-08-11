const router = require('express').Router();
const auth = require('../../services/auth');
const EmployeesController = require('../../controllers/v1/employees.controller');

//POST new employee route (required, only authenticated users have access)
router.post('/add', auth.required, EmployeesController.add);

//PUT update employee (required, only authenticated users have access)
router.put('/update/:id', auth.required, EmployeesController.update);

//DELETE employee route (required, only authenticated users have access)
router.delete('/remove/:id', auth.required, EmployeesController.remove);

//GET index route (required, only authenticated users have access)
router.get('/', auth.required, EmployeesController.index);

//GET index route (required, only authenticated users have access)
router.get('/find/:criteria/:prop', auth.required, EmployeesController.find);

module.exports = router;
