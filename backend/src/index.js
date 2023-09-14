import express from 'express';
import * as dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import route from './route/index.js';
const port = 4000 || process.env.PORT
const app = express();

// setting read file json 
app.use(cookieParser());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded());

//route
route(app)


//app
app.listen(port, () => console.log(`Listening on port ${port} : http://127.0.0.1:${port}`));
