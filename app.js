import "dotenv/config";
import session from "express-session";
import express from 'express';
import Hello from "./hello.js"
import cors from "cors";
const app = express()
app.use(cors());
Hello(app);
app.listen(process.env.PORT || 4000)