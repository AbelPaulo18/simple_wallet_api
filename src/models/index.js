import { Sequelize, DataTypes } from "sequelize";

import { dataBaseConfig } from "../config/db.config.js";

/* Models */
import { accountModel } from "./account/index.js";
import { feesModel } from "./fees/index.js";
import { tradeModel } from "./trade/index.js";
import { transactionModel } from "./transactions/index.js";
import { userModel } from "./user/index.js";
import { adminModel } from "./admin/index.js";

//Defining database...
const sequelize = new Sequelize(
  dataBaseConfig.database,
  dataBaseConfig.username,
  dataBaseConfig.password,
  {
    host: dataBaseConfig.host,
    dialect: dataBaseConfig.dialect,
  }
);

//Authenticating to Db...
sequelize
  .authenticate()
  .then(() => console.log("Connected to the database..."))
  .catch((error) => console.log("Error :" + error));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* Creating tables... */
db.adminModel = adminModel(sequelize, DataTypes);
db.userModel = userModel(sequelize, DataTypes);
db.tradeModel = tradeModel(sequelize, DataTypes);
db.feesModel = feesModel(sequelize, DataTypes);
db.transactionModel = transactionModel(sequelize, DataTypes);
db.accountModel = accountModel(sequelize, DataTypes);

/* database tables relations */
db.accountModel.belongsTo(db.userModel, {
  constraint: true,
  foreign: "userId",
});

db.tradeModel.belongsTo(db.feesModel, {
  constraint: true,
  foreign: "feesId",
});

db.tradeModel.belongsTo(db.adminModel, {
  constraint: true,
  foreign: "adminId",
});

db.tradeModel.belongsTo(db.accountModel, {
  constraint: true,
  foreign: "accountId",
});

//Database Syncing...
db.sequelize.sync({ force: false }).then(() => {
  console.log("Synced and running...");
});

export { db };
