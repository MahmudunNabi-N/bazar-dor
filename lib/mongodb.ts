import { MongoClient } from "mongodb";

// Add your MongoDB Atlas connection string to .env.local as MONGODB_URL.
const uri = process.env.MONGODB_URL;

if (!uri) {
  throw new Error(
    "MONGODB_URL is missing. Copy .env.example to .env.local and add your MongoDB Atlas URI.",
  );
}


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


export const mongoDb = mongoClient.db();
