import { GoogleGenerativeAI } from "@google/generative-ai";
import { message } from "antd";

export const APIKeyValidator = async (config) => {
  // Check if apiKey or model is missing from the config
  if (!config?.api_key) throw new Error("API key is missing.");
  if (!config?.model) throw new Error("Model is missing.");

  try {
    const genAI = new GoogleGenerativeAI(config.api_key);

    const model = genAI.getGenerativeModel({ model: config.model });

    const prompt = "Hello World!";

    // Try to generate content and await the result
    const result = await model.generateContent(prompt);

    if (!result || !result.response)
      throw new Error("No valid response from the model.");

    return true;
  } catch ({ status }) {
    if (status == 400) {
      throw {
        error: "Invalid API Key",
        message: "API key not valid. Please pass a valid API key.",
      };
    } else {
      throw error;
    }
  }
};
