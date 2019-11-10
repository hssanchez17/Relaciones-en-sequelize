'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Company.associate = function(models) {
    Company.hasMany(models.User, {foreignKey: 'companyId', as: 'employes'})
  };
  return Company;
};