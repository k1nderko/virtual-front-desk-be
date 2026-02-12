const db = require('../models');

const getAdminTasks = async (req, res) => {
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

const createAdminTask = async (req, res) => {
    try {
        const { instruction, options = [] } = req.body;
        const task = await db.Task.create({ instruction });
        if (options && options.length > 0) {
            await db.Option.bulkCreate(
                options.map((opt) => ({
                    taskId: task.id,
                    text: opt.text,
                    isCorrect: !!opt.isCorrect,
                }))
            );
        }
        const created = await db.Task.findByPk(task.id, {
            include: [{ model: db.Option, as: 'options', attributes: ['id', 'text', 'isCorrect'] }],
        });
        res.json(created);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
};
const updateAdminTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const { instruction, options = [] } = req.body;
        const task = await db.Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        task.instruction = instruction ?? task.instruction;
        await task.save();
        await db.Option.destroy({ where: { taskId } });
        if (options && options.length > 0) {
            await db.Option.bulkCreate(
                options.map((opt) => ({
                    taskId,
                    text: opt.text,
                    isCorrect: !!opt.isCorrect,
                }))
            );
        }
        const updated = await db.Task.findByPk(taskId, {
            include: [{ model: db.Option, as: 'options', attributes: ['id', 'text', 'isCorrect'] }],
        });
        res.json(updated);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
};
const deleteAdminTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await db.Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await task.destroy();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({ error: 'Failed to delete task' });
        }
};

module.exports = {
    getAdminTasks,
    createAdminTask,
    updateAdminTask,
    deleteAdminTask
};