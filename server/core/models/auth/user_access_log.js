/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('access_log', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    requestUri: {
      field: 'request_uri',
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: ''
    },
    request: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    method: {
      type: DataTypes.STRING(6),
      allowNull: false
    },
    allowed: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    clientIp: {
      field: 'client_ip',
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ''
    },
    headers: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: Date.now
    }
  }, {
    tableName: 'user_access_log',
    timestamps: false
  });
};
