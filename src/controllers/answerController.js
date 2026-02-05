const db = require('../models');

const submitAnswer = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { optionId } = req.body;
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Session token is required' });
    }

    if (!optionId) {
      return res.status(400).json({ error: 'Option ID is required' });
    }

    // Find session by token
    const session = await db.SessionToken.findOne({
      where: { token: token }
    });

    if (!session) {
      return res.status(401).json({ error: 'Invalid session token' });
    }

    // Verify task and option exist and option belongs to task
    const task = await db.Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const option = await db.Option.findOne({
      where: {
        id: optionId,
        taskId: taskId
      }
    });

    if (!option) {
      return res.status(404).json({ error: 'Option not found for this task' });
    }

    // Find or create answer
    const [answer, created] = await db.Answer.findOrCreate({
      where: {
        sessionId: session.id,
        taskId: taskId
      },
      defaults: {
        sessionId: session.id,
        taskId: taskId,
        optionId: optionId
      }
    });

    // Update if answer already exists
    if (!created) {
      answer.optionId = optionId;
      await answer.save();
    }

    // Return result
    res.json({
      isCorrect: option.isCorrect,
      message: option.isCorrect ? 'Correct answer!' : 'Wrong answer'
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
};

module.exports = {
  submitAnswer
};
