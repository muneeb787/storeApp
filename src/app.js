import express from "express";
import mainRouter from "./routes/index.js";
import connectDB from "./config/db.js";
import env from "dotenv";
import cors from "cors";
import path from "path"

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const parentDir = path.dirname(__dirname);

env.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

connectDB();

const corsOptions = {
  origin: ['http://localhost:5173',
    'http://localhost:5174'],
  methods: 'GET,PUT,PATCH,POST,DELETE',
  credentials: true, // If you need to include cookies in the request
};
// const corsOptions = {
//   origin: 'http://localhost:5173',
//   methods: 'GET,PUT,PATCH,POST,DELETE',
//   credentials: true, // If you need to include cookies in the request
// };

app.use(cors(corsOptions));

app.use('/images', express.static(path.join(parentDir, 'images')));

app.use(mainRouter);


app.listen(process.env.PROJECT_PORT || 3301, () => {
  console.log(`App is listening on port ${process.env.PROJECT_PORT}`);
})
