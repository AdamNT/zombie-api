import model from '../models';

const Item = model.Item;

const getAll = async (req, res) => {
  try {
    const items = await Item.findAll();

    res.status(200).json(items);
  } catch (e) {
    res.status(400).send(e);
  }
};

export default {
  getAll,
};
