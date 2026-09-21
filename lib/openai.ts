import OpenAI from "openai";
import { MARKETING_SYSTEM_PROMPT } from "@/lib/prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateMarketingContent(prompt: string) {
  const response = await openai.responses.create({
    model: "gpt-5",
    instructions: MARKETING_SYSTEM_PROMPT,
    input: prompt,
  });

  return response.output_text;
}
