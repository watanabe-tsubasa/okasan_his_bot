import { OpenAI } from "openai";
import { systemPrompt } from "./systemPrompt";

export const hisReply = async (userMessage:string): Promise<string | null> => {
  const client = new OpenAI();
  const response = await client.responses.create({
    model: "gpt-5",
    reasoning: { effort: "minimal" },
    instructions: systemPrompt,
    input: userMessage
  })

  return (response.output_text);
}