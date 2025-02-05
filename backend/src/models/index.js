import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import defineMedia from './Media.js';
import defineUser from './User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: join(__dirname, '../../database.sqlite'),
  logging: false
});

const Media = defineMedia(sequelize);
const User = defineUser(sequelize);

// Define relationships
User.hasMany(Media, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Media.belongsTo(User, {
  foreignKey: 'userId'
});

export { sequelize, Media, User };