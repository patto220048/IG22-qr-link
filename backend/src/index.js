import express from 'express';
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import route from './route/index.js';
import db from './database/index.js'
import * as dotenv from 'dotenv';
import cors from "cors"
dotenv.config()
const PORT = process.env.PORT || 8000
const app = express();

// setting read file json 
app.use(cookieParser());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded());
//cors
app.use(cors({
    origin: process.env.CLIENT_URL_ORIGIN, //or whatever port your frontend is using
    credentials: true,            
 
}))
// connect to db
db.connect()    
//route
route(app)
//app
app.listen(PORT, () => console.log(`Listening on port ${PORT} : ${process.env.HOST}:${PORT} : mode ${NODE_ENV}`));
