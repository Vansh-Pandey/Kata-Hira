import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";

import path from "path";
import authRoutes from "./routes/auth.route.js"
import profileRoute from "./routes/profile.route.js"
dotenv.config()
const PORT=process.env.PORT
const __dirname = path.resolve();

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());  
app.use( 
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);
app.use("/api/auth",authRoutes);
app.use("/api/profile",profileRoute);

if ( process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  })
}

app.listen(PORT, ()=>{ 
    console.log(`server is running on port ${PORT}`)
    connectDB()
})