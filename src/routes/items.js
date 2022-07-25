import express from 'express';
import itemController from '../controllers/item.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Item managment
 * /items:
 *  get:
 *   tags: [Items]
 *   description: get all items
 *   responses:
 *    '200':
 *     description: A successful response
 */

router.get('/', itemController.getAll);

export default router;
