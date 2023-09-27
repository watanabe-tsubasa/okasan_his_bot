import { OpenAI } from "openai";
import { systemPrompt } from "./systemPrompt";

const openai = new OpenAI();

const main = async (userMessage:string) => {
    const completion = await openai.chat.completions.create({
      messages: [
        {
            role: "system",
            content: systemPrompt
        },
        {
            role: "user",
            content: userMessage
        },
    ],
      model: "gpt-3.5-turbo-0613",
    });
    console.log(userMessage)
    console.log(completion.choices[0].message.content);
  }