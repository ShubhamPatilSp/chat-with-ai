import { NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Generate response from Gemini
    const botResponse = await generateChatResponse(message);

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
