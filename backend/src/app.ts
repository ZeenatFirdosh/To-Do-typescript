import express, { Request, Response } from "express";
import todoRouter from "./routers/todo";
var cors = require('cors')

const app = express();
 
// Parse incomming JSON
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Rest API uing node",
  });
});

app.use(todoRouter);

export default app;
