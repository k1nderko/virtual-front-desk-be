module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    instruction: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'tasks',
    timestamps: true,
    underscored: true
  });

  return Task;
};
