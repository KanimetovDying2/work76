import { promises as fs } from "fs";
import { MessageMutationT, MessageT } from "./types";
import { randomUUID } from "crypto";

const filename = "./db.json";
let data: MessageT[] = [];

const fileDb = {
  async init() {
    try {
      const fileContent = await fs.readFile(filename, "utf-8");
      data = JSON.parse(fileContent) as MessageT[];
    } catch (e) {
      data = [];
    }
  },
  async getmessages(datetime?: string): Promise<MessageT[]> {
    if (!datetime) {
      return data.slice(-30);
    }
    const date = new Date(datetime);
    if (isNaN(date.getDate())) {
      throw new Error("Error! Invalid date!");
    }
    const filtered = data.filter((msg) => new Date(msg.datetime) > date);
    return filtered.slice(-30);
  },

  async save(userMsg: MessageMutationT): Promise<MessageT> {
    const newMessage: MessageT = {
      id: randomUUID(),
      datetime: new Date().toISOString(),
      ...userMsg,
    };
    data.push(newMessage);
    await fs.writeFile(filename, JSON.stringify(data, null, 2));
    return newMessage;
  },
};

export default fileDb;
