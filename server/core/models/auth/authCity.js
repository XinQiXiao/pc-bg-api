/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authCity', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    display_name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'auth_city',
    timestamps: false
  });
};
