import nodeCron from 'node-cron';
import fetch from 'node-fetch';

import models from '../models';

const initItemCron = () => {
  // https://crontab.cronhub.io/  0 0 * * *
  const scheduledJobFunction = nodeCron.schedule('0 0 * * *', async () => {
    try {
      const response = await fetch(`${process.env.API_ZOMBIE_ITEMS_URL}/items`);
      const data = await response.json();
      const items = data.items ?? [];

      await models.Item.bulkCreate(items);

      console.log('Items cron run at: ', new Date().toLocaleString());
    } catch (error) {
      //
    }
  });

  scheduledJobFunction.start();
};

export default initItemCron;
