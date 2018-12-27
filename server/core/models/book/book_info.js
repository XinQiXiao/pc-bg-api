/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('book_info', {
    book_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    book_category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'book_category',
        key: 'category_id'
      }
    },
    book_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    author: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    press: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: '机械工业出版社'
    },
    pubdate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    store: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'book_info',
    timestamps: false
  });
};
