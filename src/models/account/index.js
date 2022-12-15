export const accountModel = (sequelize, DataTypes) => {
  const account = sequelize.define("account", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    ref: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
  });
  return account;
};
