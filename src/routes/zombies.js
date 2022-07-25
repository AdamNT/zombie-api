import express from 'express';
import zombieController from '../controllers/zombie.controller';
import zombieItemsRouter from './zombieItems';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Zombies
 *   description: Zombie managment
 * /zombies:
 *  get:
 *   tags: [Zombies]
 *   description: get all zombies
 *   responses:
 *    '200':
 *     description: A successful response
 *  post:
 *   tags: [Zombies]
 *   description: add zombie
 *   responses:
 *    '201':
 *      description: Created
 * /zombies/{id}:
 *  get:
 *   tags: [Zombies]
 *   description: get all zombies
 *   responses:
 *    '200':
 *     description: A successful response
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: integer
 *      required: true
 *      description: Numeric ID of the zombie to get
 *  put:
 *   tags: [Zombies]
 *   description: get all zombies
 *   responses:
 *    '200':
 *     description: A successful response
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: integer
 *      required: true
 *      description: Numeric ID of the zombie to put
 *  delete:
 *   tags: [Zombies]
 *   description: delete all zombies
 *   responses:
 *    '200':
 *     description: A successful response
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: integer
 *      required: true
 *      description: Numeric ID of the zombie to delete
 */

router.get('/', zombieController.getAll);
router.get('/:id', zombieController.getById);
router.post('/', zombieController.create);
router.put('/:id', zombieController.update);
router.delete('/:id', zombieController.remove);

router.use('/:id/items', zombieItemsRouter);

export default router;
