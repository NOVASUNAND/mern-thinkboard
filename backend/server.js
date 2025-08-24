import express from "express";// const mongoose = require('mongoose');
import notesRoutes from"./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
console.log('Environment Variables:', process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);


app.listen(PORT, () => {
    console.log('Server is running at http://localhost:3000');
});
