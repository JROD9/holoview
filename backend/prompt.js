import OpenAI from 'openai';
import dotenv from 'dotenv';
import { writeFileSync } from "node:fs";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});

// intial prompt to ask 3 questions
const getQuestions = async (prompt) => {
    const response = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        max_tokens: 100, // change when going to prod
        temperature: 0.5, // Adjust creativity
        messages: [{"role": "user", "content": prompt}]
    });
    return response.choices[0].message.content;
}

const getAudioFile = async (prompt) => {
    const response = await client.chat.completions.create({
        model: 'gpt-4o-audio-preview',
        modalities: ["text", "audio"],
        audio: { voice: "alloy", format: "wav" },
        messages: [
            {
            role: "user",
            content: "Is a golden retriever a good family dog?"
            }
        ],
        store: true,
    });
    return response.choices[0]
}

writeFileSync(
    "response.wav",
    Buffer.from(response.choices[0].message.audio.data, 'base64'),
    { encoding: "utf-8" }
  );

  

export {getQuestions}