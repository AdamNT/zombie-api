import express from 'express';
import zombieItemController from '../controllers/zombieItem.controller';

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /zombie/{id}/items:
 *  post:
 *   tags: [Zombies]
 *   description: add zombie item
 *   responses:
 *    '201':
 *      description: Created
 *  delete:
 *   tags: [Zombies]
 *   description: delete zombie item
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

router.post('/', zombieItemController.create);
router.delete('/', zombieItemController.remove);

export default router;
