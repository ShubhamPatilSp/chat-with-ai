import { createClient } from "@libsql/client";

const url = process.env.TURSO_DB_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) throw new Error("TURSO_DB_URL is not set");
if (!authToken) throw new Error("TURSO_AUTH_TOKEN is not set");

export const db = createClient({
  url,
  authToken,
});

// Initialize the chat history table
export async function initializeDatabase() {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS chat_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_message TEXT NOT NULL,
        bot_message TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}
