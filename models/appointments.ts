import { DataTypes } from 'sequelize';
import db from './index';
import { Users } from "./users";
import { MedicalTests} from "./medicaltests";


export const Appointment = db.sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  slot: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define foreign keys for Appointment
Appointment.belongsTo(Users, { foreignKey: 'userId' });
Appointment.belongsTo(MedicalTests, { foreignKey: 'testId' });

