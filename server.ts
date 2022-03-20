import express from "express";
import fs from "fs";
import { WalletRequest } from "./types";

class Server {
  app: any;
  functions: Map<string, any>;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.functions = new Map();
  }

  private setFunctions() {
    const funFiles = fs
      .readdirSync("./functions")
      .filter((file) => file.endsWith(".ts"));

    for (const file of funFiles) {
      const fun = require(`./functions/${file}`);
      this.functions.set(fun.data.name, fun);
    }
  }

  public async start() {
    console.log("Starting server on port 3000");
    this.setFunctions();

    this.app.post(
      "*",
      (req: { body: WalletRequest }, res: { json: (arg0: any) => void }) => {
        const operation = req.body.operation;
        // Check if operation exists
        if (!this.functions.has(operation)) return;
        console.log(`Executing ${operation}`);
        
        const fun = this.functions.get(operation);
        // Execute function
        const result = fun.execute(req.body);
        // Return result
        res.json(result);
      }
    );
    const server = this.app.listen(3000);
  }
}

export default Server;
