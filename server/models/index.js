import fs from 'fs';
import path from 'path';
import sequelize from 'sequelize';

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const Sequelize = sequelize;
const config = require('../config/config.json')[env];

const db = {};
let sqlize;

if (config.use_env_variable) {
  sqlize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sqlize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sqlize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sqlize;
db.Sequelize = Sequelize;

module.exports = db;
