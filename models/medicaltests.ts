import { DataTypes } from "sequelize";
import db from "./index";

export const MedicalTests = db.sequelize.define('medicaltests',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  testName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  disease: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});