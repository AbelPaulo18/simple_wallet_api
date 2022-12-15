import dotenv from "dotenv";

dotenv.config();

const dataBaseConfig = {
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  dialect: process.env.MYSQL_DIALECT,
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
  },
};

export { dataBaseConfig };
