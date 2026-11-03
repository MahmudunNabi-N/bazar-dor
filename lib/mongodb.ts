import { MongoClient } from "mongodb";

// Add your MongoDB Atlas connection string to .env.local as MONGODB_URL.
const uri = process.env.MONGODB_URL;

if (!uri) {
  throw new Error(
    "MONGODB_URL is missing. Copy .env.example to .env.local and add your MongoDB Atlas URI.",
  );
}

// Reuse one MongoClient during Next.js development hot reloads.
const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

export const mongoClient =
  globalForMongo.mongoClient ??
  new MongoClient(uri, {
    maxPoolSize: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = mongoClient;
}

// The database name is read from the database name in your Atlas URI.
export const mongoDb = mongoClient.db();
