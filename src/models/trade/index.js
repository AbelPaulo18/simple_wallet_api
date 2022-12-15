export const tradeModel = (sequelize, DataTypes) => {
  const trade = sequelize.define("trade", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Deposit", "Cashout"),
      allowNull: false,
    },
  });
  return trade;
};
