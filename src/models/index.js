import 'dotenv/config';
import { upperFirst, orderBy } from 'lodash';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import getItemModel from './item';
import getZombieModel from './zombie';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST ?? 'localhost',
    dialect: 'postgres',
    define: {
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci',
      },
      timestamps: false,
    },
  }
);

const models = {
  Item: getItemModel(sequelize, Sequelize),
  Zombie: getZombieModel(sequelize, Sequelize),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

const dropDB = process.env.DB_SYNC ?? false;
const reSyncDB = process.env.SEEDS_IMPORT ?? false;

// sequelize.sync({ force: reSyncDB || dropDB }).then(async () => {
//   console.log('Drop and re-sync db.');

//   if (reSyncDB) {
//     const seedsPath = path.join(__dirname, '../seeds');
//     const orderedSeed = orderBy(
//       fs.readdirSync(seedsPath).map(file => {
//         const [order, originFile] = file.split('_');

//         return { order, file, originFile };
//       }),
//       'order',
//       'asc'
//     );

//     for (const item of orderedSeed) {
//       const { file, originFile } = item;
//       const fileName = originFile.split('.').slice(0, -1).join('.');
//       const seedData = require(path.join(seedsPath, file));

//       await models[upperFirst(fileName)].bulkCreate(seedData);
//     }
//   }
// });

export { sequelize };

export default models;
