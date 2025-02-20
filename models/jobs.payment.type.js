"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

const Jobs = require("./jobs");
class JobPaymentType extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   *
   */
}

JobPaymentType.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    months: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    meta: {
      type: DataTypes.TEXT({ length: "long" }),
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "jobspaymenttypes",
  }
);

module.exports = JobPaymentType;
