const getZombieModel = (sequelize, { DataTypes }) => {
  const Zombie = sequelize.define('zombie', {
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now'),
      onUpdate: sequelize.fn('now'),
    },
  });

  Zombie.associate = models => {
    Zombie.belongsToMany(models.Item, { through: 'zombieItems' });
  };

  return Zombie;
};

export default getZombieModel;
