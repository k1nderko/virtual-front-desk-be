module.exports = (sequelize, DataTypes) => {
  const SessionToken = sequelize.define('SessionToken', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'session_tokens',
    timestamps: true,
    underscored: true
  });

  return SessionToken;
};
