import express from "express";
import connectDB from "./config/db.js";
import env from "dotenv";
import { orderRouter } from "./routes/router.js";
// import cors from 'cors';

env.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use(cors);

connectDB();

app.use('/', orderRouter);
const PORT = process.env.PROJECT_PORT || 3301;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});


