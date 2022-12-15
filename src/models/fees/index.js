export const feesModel = (sequelize, DataTypes) => {
  const fees = sequelize.define("fees", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
  });
  return fees;
};
