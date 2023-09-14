import express from "express";
import connectDB from "./config/db.js";
import env from "dotenv";
import authMiddleware from "./middleware/authMiddleware.js";

env.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();
app.listen(process.env.PROJECT_PORT || 3301, () => {
  console.log(`App is listening on port ${process.env.PROJECT_PORT}`);
});

app.get("/",authMiddleware,(req,res)=>{
  res.send(`
  <div>
  <h1>Auth Middleware is already called!!!</h1>
  </div>`
  )
})
