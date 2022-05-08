import { Sequelize } from "sequelize";

const sequelize = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: "./db/database.sqlite",
});

export default sequelize;
