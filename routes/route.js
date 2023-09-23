const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');
const { checkAuth } = require('../middlewares/auth');
//user routes
router.post('/register',userController.createUser);
router.post('/login',userController.loginUser);
// task routes
router.post('/createTask' ,checkAuth,taskController.createTask);
router.get('/taskdetails/:id',checkAuth,taskController.getTask);
router.put('/updatetask/:id',taskController.updatetask);
router.delete('/deletetask/:id',taskController.deleteTask)
module.exports = router;