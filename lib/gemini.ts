import { GoogleGenerativeAI } from '@google/generative-ai';

// Simple in-memory request tracking
const requestTracker = {
  lastRequestTime: 0,
  requestCount: 0,
  resetTime: 0
};

// Rate limit settings
const RATE_LIMIT = {
  requests: 5,      // Number of requests allowed
  window: 60000,    // Time window in milliseconds (1 minute)
  cooldown: 3600000 // Cooldown period in milliseconds (1 hour)
};

// Safely get environment variable
const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    console.error(`Environment variable ${key} is not set`);
    return '';
  }
  return value;
};

const apiKey = getEnvVar('GEMINI_API_KEY');
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI?.getGenerativeModel({ model: "gemini-pro" });

// Check if we're currently rate limited
function isRateLimited(): boolean {
  const now = Date.now();

  // Reset counter if we're in a new window
  if (now - requestTracker.lastRequestTime > RATE_LIMIT.window) {
    requestTracker.requestCount = 0;
    requestTracker.resetTime = 0;
  }

  // Check if we're in cooldown
  if (requestTracker.resetTime > now) {
    return true;
  }

  // Update tracker
  requestTracker.lastRequestTime = now;
  requestTracker.requestCount++;

  // If we've exceeded the limit, set cooldown
  if (requestTracker.requestCount > RATE_LIMIT.requests) {
    requestTracker.resetTime = now + RATE_LIMIT.cooldown;
    return true;
  }

  return false;
}

// Get remaining cooldown time in minutes
function getCooldownMinutes(): number {
  const remaining = Math.max(0, requestTracker.resetTime - Date.now());
  return Math.ceil(remaining / 60000);
}

// Utility function to wait with exponential backoff
async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Rate limit handling constants
const MAX_RETRIES = 3;
const BASE_DELAY = 2000; // 2 seconds
const MAX_DELAY = 60000; // 1 minute

export async function generateChatResponse(message: string, retries = MAX_RETRIES): Promise<string> {
  if (!genAI || !model) {
    return "I apologize, but I'm not properly configured at the moment. Please check the API key configuration.";
  }

  // Check rate limiting
  if (isRateLimited()) {
    const minutes = getCooldownMinutes();
    return `I apologize, but I'm currently rate limited. Please try again in ${minutes} minute${minutes === 1 ? '' : 's'}.`;
  }

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
        maxOutputTokens: 150, // Further reduced to help with rate limits
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

    // Return user-friendly messages for other errors
    if (error?.status === 401) {
      return "I apologize, but there seems to be an authentication issue. Please check the API key configuration.";
    } else if (error?.status === 403) {
      return "I apologize, but the API key doesn't have proper access rights.";
    } else if (error?.status === 500) {
      return "I apologize, but the AI service is experiencing technical difficulties. Please try again later.";
    }

    // If we've exhausted all retries or hit a non-retryable error
    return "I apologize, but I'm currently experiencing high traffic. Please try again in a few minutes.";
  }
}
