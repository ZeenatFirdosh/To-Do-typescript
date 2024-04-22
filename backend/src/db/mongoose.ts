import mongoose from "mongoose";

const MONGODB_URL: string = "mongodb+srv://ToDoTypescript:ToDoTypescript@cluster0.7bcnme9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error(err);
  });
