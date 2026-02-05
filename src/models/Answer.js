module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'session_tokens',
        key: 'id'
      }
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tasks',
        key: 'id'
      }
    },
    optionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'options',
        key: 'id'
      }
    }
  }, {
    tableName: 'answers',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['session_id', 'task_id']
      }
    ]
  });

  return Answer;
};
