import express from "express";
import mainRouter from "./routes/index.js";
import connectDB from "./config/db.js";
import env from "dotenv";
import cors from "cors";

env.config();


const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

connectDB();

const corsOptions = {
  origin: '*', 
  methods: 'GET,PUT,POST,DELETE',
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(mainRouter);


app.listen(process.env.PROJECT_PORT || 3301, () => {
  console.log(`App is listening on port ${process.env.PROJECT_PORT}`);
})
