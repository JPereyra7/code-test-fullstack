import { createServer } from "./vite-server";
import { Sequelize } from "sequelize";
import bodyParser from "body-parser";

import { initTodo } from "./models/Todo";
import APIRoutes from "./routes/api";

const start = async () => {
  const sequelize = new Sequelize({
    dialect: "postgres",
    database: "postgres",
    username: "postgres",
    password: "postgres",
    host: "127.0.0.1",
    port: 5432,
  });

  initTodo(sequelize);

  const { serve, app } = await createServer();

  app.get("/test", (_, res) => {
    res.json({ hello: "worlddd" });
  });

  app.use(bodyParser.json());
  app.use("/api", APIRoutes);

  sequelize.sync().then(() => {
    serve();
  });
};

start();
