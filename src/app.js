import express from "express";
import connectDB from "./config/db.js";
import env from "dotenv";
env.config();

import productRouter from "./routes/product.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use("/products", productRouter);

app.listen(process.env.PROJECT_PORT || 3301, () => {
  console.log(`App is listening on port ${process.env.PROJECT_PORT}`);
});
