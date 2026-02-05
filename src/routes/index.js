const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessionController');
const taskController = require('../controllers/taskController');
const answerController = require('../controllers/answerController');

// GET session token
router.get('/session/token', sessionController.generateSessionToken);

// GET worksheet tasks
router.get('/tasks', taskController.getTasks);

// POST worksheet task answer
router.post('/tasks/:taskId/answer', answerController.submitAnswer);

module.exports = router;
