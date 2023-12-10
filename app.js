import "dotenv/config";
import session from "express-session";
import UserRoutes from "./users/routes.js";
import ReviewRoutes from "./reviews/routes.js";
import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
const CONNECTION_STRING = "mongodb+srv://XenoPixel:Bixby1201@cluster0.tnebxex.mongodb.net/anime-atlas?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_STRING)
const app = express()
app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL
    })
   );
  const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
  app.use(session(sessionOptions));
  
  
app.use(express.json());
UserRoutes(app)
ReviewRoutes(app)
app.listen(process.env.PORT || 4000)