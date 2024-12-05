import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Utility function to wait with exponential backoff
async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Rate limit handling constants
const MAX_RETRIES = 3;
const BASE_DELAY = 2000; // 2 seconds
const MAX_DELAY = 60000; // 1 minute

export async function generateChatResponse(message: string, retries = MAX_RETRIES): Promise<string> {
  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: "You are a helpful AI assistant. Please provide clear and concise responses.",
        },
        {
          role: "model",
          parts: "I understand. I'll be helpful and provide clear, concise responses.",
        },
      ],
      generationConfig: {
        maxOutputTokens: 250, // Reduced to help with rate limits
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();

  } catch (error: any) {
    console.error('Error generating chat response:', error);

    // Handle rate limiting and other retryable errors
    if ((error?.message?.includes('rate limit') || error?.status === 429) && retries > 0) {
      const delay = Math.min(BASE_DELAY * Math.pow(2, MAX_RETRIES - retries), MAX_DELAY);
      console.log(`Rate limited. Retrying in ${delay/1000} seconds... (${retries} retries left)`);
      await wait(delay);
      return generateChatResponse(message, retries - 1);
    }

    // Handle specific error cases
    if (error?.status === 401) {
      throw new Error('Invalid API key. Please check your GEMINI_API_KEY environment variable.');
    } else if (error?.status === 403) {
      throw new Error('API key does not have access to Gemini Pro.');
    } else if (error?.status === 500) {
      throw new Error('Gemini service is experiencing issues. Please try again later.');
    }

    // If we've exhausted all retries or hit a non-retryable error
    if (retries === 0) {
      return "I apologize, but I'm currently experiencing high traffic. Please try again in a few minutes.";
    }

    throw new Error('Failed to generate response. Please try again.');
  }
}
