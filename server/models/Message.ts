import { DataTypes } from 'sequelize';
import { sequelize } from '../lib';

export const Message = sequelize.define('Message', {
  content: DataTypes.STRING,
});
