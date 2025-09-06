import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Please check your .env.local file.");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);