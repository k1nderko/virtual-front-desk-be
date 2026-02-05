const db = require('../models');

const getTasks = async (req, res) => {
  try {
    const tasks = await db.Task.findAll({
      include: [{
        model: db.Option,
        as: 'options',
        attributes: ['id', 'text', 'isCorrect']
      }],
      order: [['id', 'ASC']]
    });

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

module.exports = {
  getTasks
};
