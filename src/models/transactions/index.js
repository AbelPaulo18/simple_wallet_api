export const transactionModel = (sequelize, DataTypes) => {
  const transaction = sequelize.define("transaction", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Done"),
      defaultValue: "Pending",
    },
    accountRecieverID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accountSenderID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  });
  return transaction;
};

/* 

  
    accountSenderID: {
      type: DataTypes.STRING,
      allowNull: false,
    },

*/
