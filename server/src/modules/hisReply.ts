import { OpenAI } from "openai";
import { systemPrompt } from "./systemPrompt";

export const hisReply = async (userMessage:string): Promise<string | null> => {
  const openai = new OpenAI();
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

  return (completion.choices[0].message.content);
}