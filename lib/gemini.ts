import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function generateChatResponse(message: string, retries = 3): Promise<string> {
  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: "Hello, you are a helpful AI assistant. Please provide clear and concise responses.",
        },
        {
          role: "model",
          parts: "I understand. I'll be a helpful assistant and provide clear, concise responses to your questions.",
        },
      ],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();

  } catch (error: any) {
    console.error('Error generating chat response:', error);

    // Handle rate limiting
    if (error?.status === 429 && retries > 0) {
      const delay = 1000 * (Math.pow(2, 3 - retries)); // Exponential backoff
      console.log(`Rate limited. Retrying in ${delay/1000} seconds...`);
      await wait(delay);
      return generateChatResponse(message, retries - 1);
    }

    // Handle other errors
    if (error?.status === 401) {
      throw new Error('Invalid Gemini API key');
    } else if (error?.status === 403) {
      throw new Error('Gemini API key does not have access');
    } else if (error?.status === 500) {
      throw new Error('Gemini service is experiencing issues');
    }

    throw new Error('Failed to generate response from Gemini');
  }
}
