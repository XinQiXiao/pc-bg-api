/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    login_name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
      unique: true
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: ''
    },
    password_hashed: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    salt: {
      type: DataTypes.CHAR(6),
      allowNull: false
    },
    display_name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: ''
    },
    mobile: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    create_ip: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: ''
    },
    status: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    city_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'user',
    timestamps: false
  });
};
