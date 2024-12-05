import { createClient } from "@libsql/client";

const url = process.env.TURSO_DB_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) throw new Error("TURSO_DB_URL is not set");
if (!authToken) throw new Error("TURSO_AUTH_TOKEN is not set");

export const db = createClient({
  url,
  authToken,
});

// Simple database health check
export async function initializeDatabase() {
  try {
    await db.execute(`SELECT 1`);
    console.log("Database connection verified");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
}
