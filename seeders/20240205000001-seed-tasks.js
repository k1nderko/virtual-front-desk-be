'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert 3 example tasks
    await queryInterface.bulkInsert('tasks', [
      {
        instruction: 'What is the capital of France?',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        instruction: 'Which programming language is primarily used for web frontend development?',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        instruction: 'What does HTTP stand for?',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    // Get the inserted task IDs (they will be 1, 2, 3)
    const taskIds = [1, 2, 3];

    // Insert options for each task
    // Task 1: What is the capital of France?
    await queryInterface.bulkInsert('options', [
      {
        task_id: taskIds[0],
        text: 'London',
        is_correct: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        task_id: taskIds[0],
        text: 'Berlin',
        is_correct: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        task_id: taskIds[0],
        text: 'Paris',
        is_correct: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        task_id: taskIds[0],
        text: 'Madrid',
        is_correct: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Task 2: Which programming language is primarily used for web frontend development?
      {
        task_id: taskIds[1],
        text: 'Python',
        is_correct: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        task_id: taskIds[1],
        text: 'JavaScript',
        is_correct: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        task_id: taskIds[1],
        text: 'Java',
        is_correct: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        task_id: taskIds[1],
        text: 'C++',
        is_correct: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Task 3: What does HTTP stand for?
      {
        task_id: taskIds[2],
        text: 'HyperText Transfer Protocol',
        is_correct: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        task_id: taskIds[2],
        text: 'High Transfer Text Protocol',
        is_correct: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        task_id: taskIds[2],
        text: 'Hyperlink Transfer Text Protocol',
        is_correct: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        task_id: taskIds[2],
        text: 'HyperText Transmission Protocol',
        is_correct: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('options', null, {});
    await queryInterface.bulkDelete('tasks', null, {});
  }
};
