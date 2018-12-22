/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teams', {
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
    people_num: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'teams',
    timestamps: false
  });
};
