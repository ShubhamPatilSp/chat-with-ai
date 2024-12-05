import { NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/gemini';

// Check for required environment variables
const requiredEnvVars = ['GEMINI_API_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export async function POST(req: Request) {
  try {
    // Check for missing environment variables
    if (missingEnvVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    }

    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Generate response from Gemini
    const botResponse = await generateChatResponse(message);

    if (!botResponse) {
      throw new Error('Failed to generate response from AI');
    }

    // Return the response
    return NextResponse.json({
      success: true,
      message: botResponse
    });

  } catch (error) {
    console.error('Error processing chat:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process chat message';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
