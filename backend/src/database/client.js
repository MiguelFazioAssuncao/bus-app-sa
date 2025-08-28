import { Sequelize } from "sequelize";

const sequelize = new Sequelize("bus_app_sa", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

export default sequelize;
