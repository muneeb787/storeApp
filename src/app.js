import express from "express";
import mainRouter from "./routes/index.js";
import connectDB from "./config/db.js";
import env from "dotenv";
env.config();

import productRouter from "./routes/product.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
<<<<<<< HEAD
app.use("/products", productRouter);
=======
app.use(mainRouter);
>>>>>>> ec73b099fb854d91933c1ce311aa95fdd42351cd

app.listen(process.env.PROJECT_PORT || 3301, () => {
  console.log(`App is listening on port ${process.env.PROJECT_PORT}`);
})
