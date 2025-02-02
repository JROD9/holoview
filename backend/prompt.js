import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});

// intial prompt to ask 3 questions
const getPrompt = async (prompt) => {
    const response = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        max_tokens: 100, // change when going to prod
        temperature: 0.7, // Adjust creativity
        messages: [{"role": "user", "content": prompt}]
    });
    console.log(response);
    return response;
}

export {getPrompt}
