/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('book_category', {
    category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    parent_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'book_category',
    timestamps: false
  });
};
