import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
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

    // Store the conversation in the database
    await db.execute({
      sql: `INSERT INTO chat_history (user_message, bot_message) VALUES (?, ?)`,
      args: [message, botResponse]
    });

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

export async function GET() {
  try {
    const result = await db.execute(`
      SELECT * FROM chat_history 
      ORDER BY timestamp DESC 
      LIMIT 50
    `);

    return NextResponse.json({
      success: true,
      history: result.rows
    });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch chat history' },
      { status: 500 }
    );
  }
}
