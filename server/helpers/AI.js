import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config()

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const AI = async (prompt) => {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  fs.writeFileSync('prompt.txt', `${prompt} \n\n\n\n\n\ ${text}\n\n\n\n`)
  return text;
}

export default AI