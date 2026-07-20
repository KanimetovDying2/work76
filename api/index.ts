import express from "express";
import cors from "cors";
import fileDb from "./fileDb.js";
import messageRouter from "./routes/messages.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/messages", messageRouter);

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log(`Server started working on port: ${port}`);
  });
};

run().catch((e) => console.error(e));
