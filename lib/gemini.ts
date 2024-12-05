import { GoogleGenerativeAI } from '@google/generative-ai';

// Production-safe environment variable handling
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Request tracking (separate for development and production)
const requestTracker = {
  lastRequestTime: 0,
  requestCount: 0,
  resetTime: 0,
  errorCount: 0,
  lastErrorTime: 0
};

// Rate limit settings (more conservative for production)
const RATE_LIMIT = {
  requests: IS_PRODUCTION ? 3 : 5,      // Fewer requests in production
  window: 60000,    // Time window in milliseconds (1 minute)
  cooldown: 3600000, // Cooldown period in milliseconds (1 hour)
  errorThreshold: 3, // Number of errors before temporary shutdown
  errorCooldown: 1800000 // 30 minutes cooldown after errors
};

let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

try {
  if (GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-pro" });
  }
} catch (error) {
  console.error('Failed to initialize Gemini AI:', error);
}

function isRateLimited(): boolean {
  const now = Date.now();

  // Reset counter if we're in a new window
  if (now - requestTracker.lastRequestTime > RATE_LIMIT.window) {
    requestTracker.requestCount = 0;
    requestTracker.resetTime = 0;
  }

  // Reset error count after cooldown
  if (now - requestTracker.lastErrorTime > RATE_LIMIT.errorCooldown) {
    requestTracker.errorCount = 0;
  }

  // Check if we're in cooldown or error threshold exceeded
  if (requestTracker.resetTime > now || requestTracker.errorCount >= RATE_LIMIT.errorThreshold) {
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

function getCooldownMessage(): string {
  const now = Date.now();
  
  if (requestTracker.errorCount >= RATE_LIMIT.errorThreshold) {
    const remainingError = Math.ceil((RATE_LIMIT.errorCooldown - (now - requestTracker.lastErrorTime)) / 60000);
    return `Service temporarily unavailable. Please try again in ${remainingError} minutes.`;
  }

  const remainingTime = Math.ceil((requestTracker.resetTime - now) / 60000);
  return `Rate limit reached. Please try again in ${remainingTime} minutes.`;
}

export async function generateChatResponse(message: string): Promise<string> {
  // Check for missing API key
  if (!GEMINI_API_KEY) {
    return "Chat service is not properly configured. Please check API key setup.";
  }

  // Check if service is available
  if (!genAI || !model) {
    return "Chat service is currently unavailable. Please try again later.";
  }

  // Check rate limiting
  if (isRateLimited()) {
    return getCooldownMessage();
  }

  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: "You are a helpful AI assistant. Keep responses concise.",
        },
        {
          role: "model",
          parts: "Understood. I'll provide clear, concise responses.",
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();

  } catch (error: any) {
    console.error('Error generating chat response:', error);
    
    // Track errors
    requestTracker.errorCount++;
    requestTracker.lastErrorTime = Date.now();

    // Handle specific error cases
    if (error?.message?.includes('rate limit') || error?.status === 429) {
      requestTracker.resetTime = Date.now() + RATE_LIMIT.cooldown;
      return "Rate limit reached. Please try again later.";
    }

    if (error?.status === 401) {
      return "Authentication error. Please try again later.";
    }

    return "I apologize, but I'm having trouble processing your request. Please try again in a few minutes.";
  }
}
