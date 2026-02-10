import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/connectDB.js";
import { router } from "./src/routes/risk.routes.js";
import cors from 'cors';
dotenv.config({
  path: "./.env",
});
const app = express();
app.use(cors({
  origin:['http://localhost:5173'],
  credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/", (req, res) => {
  res.send("welcome to grc portal");
});
app.use('/',router)
const port = process.env.PORT || 3000;

const connect =async()=> {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(`Database error`);
  }
}
connect();
