import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { getQuestions } from './prompt.js';
const app = express();
const port = 8080;
dotenv.config();
app.use(express.json());

// ask for technical help with db not able to connect b/c of ip whitelist
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('db connected successfully');
        app.listen(port);
    })
    .then(() => console.log('server running'))
    .catch((err) => console.log("err: ", err.message))


app.get('/get-prompt', async (req, res) => {
    try {
        const prompt = 'give me an interview question regarding a software enginnering role at Google. Make sure the response can be translated into an audio file';
        return await getQuestions(prompt)
    } catch (err) {
        console.log(err.message)
    }

});

// app.listen(port, ()=> {
//     console.log("server running");
// });


