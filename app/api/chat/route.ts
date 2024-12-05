import { NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Message is required and must be a string' },
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
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred while processing your message. Please try again later.'
      },
      { status: 500 }
    );
  }
}
