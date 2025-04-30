import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../schema";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

const setup = () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    throw new Error("DATABASE_URL is not set");
  }
  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient, { schema });
  return db;
};

export default setup();
