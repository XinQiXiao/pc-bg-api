/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('players', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    team_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    interest: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: ''
    }
  }, {
    tableName: 'players',
    timestamps: false
  });
};
