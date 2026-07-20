import express from "express";
import fileDb from "../fileDb";

const messageRouter = express.Router();

messageRouter.get("/", async (req, res) => {
  const queryDate = req.query.datetime as string;

  try {
    const messages = await fileDb.getmessages(queryDate);
    res.send(messages);
  } catch (e) {
    res.status(400).json({ error: "Invalid date format!" });
  }
});

messageRouter.post("/", async (req, res) => {
  const { author, message } = req.body;

  if (!author || !message || author.trim() === "" || message.trim() === "") {
    return res.status(400).send({ error: "Author and Message are required!" });
  }

  const newMessage = await fileDb.save({ author, message });
  return res.send(newMessage);
});

export default messageRouter;
