const { Sequelize } = require('sequelize');
const config = require('../../config/database.js');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.SessionToken = require('./SessionToken')(sequelize, Sequelize);
db.Task = require('./Task')(sequelize, Sequelize);
db.Option = require('./Option')(sequelize, Sequelize);
db.Answer = require('./Answer')(sequelize, Sequelize);

// Define associations
db.Task.hasMany(db.Option, { foreignKey: 'taskId', as: 'options' });
db.Option.belongsTo(db.Task, { foreignKey: 'taskId', as: 'task' });

db.SessionToken.hasMany(db.Answer, { foreignKey: 'sessionId', as: 'answers' });
db.Answer.belongsTo(db.SessionToken, { foreignKey: 'sessionId', as: 'session' });

db.Task.hasMany(db.Answer, { foreignKey: 'taskId', as: 'answers' });
db.Answer.belongsTo(db.Task, { foreignKey: 'taskId', as: 'task' });

db.Option.hasMany(db.Answer, { foreignKey: 'optionId', as: 'answers' });
db.Answer.belongsTo(db.Option, { foreignKey: 'optionId', as: 'option' });

module.exports = db;
