const getItemModel = (sequelize, { DataTypes }) => {
  const Item = sequelize.define('item', {
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
  });

  Item.associate = models => {
    Item.belongsToMany(models.Zombie, { through: 'zombieItems' });
  };

  return Item;
};

export default getItemModel;
