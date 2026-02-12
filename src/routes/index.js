const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessionController');
const taskController = require('../controllers/taskController');
const answerController = require('../controllers/answerController');
const adminTaskController = require('../controllers/adminTaskController');

// GET session token
router.get('/session/token', sessionController.generateSessionToken);

// GET worksheet tasks
router.get('/tasks', taskController.getTasks);

// POST worksheet task answer
router.post('/tasks/:taskId/answer', answerController.submitAnswer);

// Admin tasks
router.get('/admin/tasks', adminTaskController.getAdminTasks);
router.post('/admin/tasks', adminTaskController.createAdminTask);
router.put('/admin/tasks/:taskId', adminTaskController.updateAdminTask);
router.delete('/admin/tasks/:taskId', adminTaskController.deleteAdminTask);


module.exports = router;
