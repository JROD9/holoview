import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { getPrompt } from './prompt.js';
const app = express();
const port = 8080;
dotenv.config();
app.use(express.json());

// ask for technical help with db not able to connect b/c of ip whitelist
// mongoose.connect(process.env.DB_URI)
//     .then(() => {
//         console.log('db connected successfully');
//         app.listen(port);
//     })
//     .then(() => console.log('server running'))
//     .catch((err) => console.log("err: ", err.message))


app.get('/get-prompt', async (req, res) => {
    const prompt = 'tell me a story about dogs';
    return await getPrompt(prompt)
});

app.listen(port, ()=> {
    console.log("server running");
});


