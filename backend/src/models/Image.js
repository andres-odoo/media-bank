import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const Image = sequelize.define('Image', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'Uncategorized'
  }
});

export default Image;