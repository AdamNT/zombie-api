import model from '../models';
import { getIdParam } from '../utils/helpers';

const Zombie = model.Zombie;

const getAll = async (req, res) => {
  try {
    const zombies = await Zombie.findAll({ include: model.Item });

    res.status(200).json(zombies);
  } catch (e) {
    res.status(400).send(e);
  }
};

const getById = async (req, res) => {
  try {
    const id = getIdParam(req);
    const zombie = await Zombie.findByPk(id, { include: model.Item });

    if (zombie) {
      res.status(200).json(zombie);
    } else {
      res.status(404).send('404 - Not found');
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

const create = async (req, res) => {
  try {
    const newZombie = await Zombie.create(req.body);
    res.status(201).send(newZombie);
  } catch (e) {
    res.status(400).send(e);
  }
};

const update = async (req, res) => {
  try {
    const id = getIdParam(req);

    await Zombie.update(req.body, {
      where: {
        id: id,
      },
    });

    const zombie = await Zombie.findByPk(id);

    res.status(200).json(zombie);
  } catch (e) {
    res.status(400).send(e);
  }
};

const remove = async (req, res) => {
  try {
    const id = getIdParam(req);

    const zombie = await Zombie.findByPk(id);
    await Zombie.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json(zombie);
  } catch (e) {
    res.status(400).send(e);
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
