import model from '../models';
import { getIdParam } from '../utils/helpers';

const Zombie = model.Zombie;
const Item = model.Item;

const create = async (req, res) => {
  try {
    const zombieId = getIdParam(req);
    const zombie = await Zombie.findByPk(zombieId);
    const item = await Item.findByPk(req.body.itemId);

    await zombie.addItem(item);
    const zombieAddedItem = await Zombie.findByPk(zombieId, {
      include: model.Item,
    });

    res.status(201).send(zombieAddedItem);
  } catch (e) {
    res.status(400).send(e);
  }
};

const remove = async (req, res) => {
  try {
    const zombieId = getIdParam(req);
    const itemId = req.body.itemId;

    const zombie = await Zombie.findByPk(zombieId);
    await zombie.removeItem([itemId]);
    const zombieRemovedItem = await Zombie.findByPk(zombieId, {
      include: model.Item,
    });

    res.status(200).json(zombieRemovedItem);
  } catch (e) {
    res.status(400).send(e);
  }
};

export default {
  create,
  remove,
};
