import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
const app = express();
const port = 8080;
dotenv.config();

mongoose.connect(process.env.DB_URI, )
    .then(() => {
        console.log('db connected successfully');
        return app.listen(port);
    })
    .then(() => console.log('server running'))
    .catch((err) => console.log("err: ", err.message))


