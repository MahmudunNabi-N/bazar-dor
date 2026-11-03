import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { mongoClient, mongoDb } from "@/lib/mongodb";

// Add a random secret (at least 32 characters) to .env.local.
const secret = process.env.BETTER_AUTH_SECRET;

// Add your app URL to .env.local. Local development: http://localhost:3000
const baseURL = process.env.BETTER_AUTH_URL;

if (!secret || secret.length < 32) {
  throw new Error(
    "BETTER_AUTH_SECRET is missing or too short. Add a random secret of at least 32 characters to .env.local.",
  );
}

if (!baseURL) {
  throw new Error(
    "BETTER_AUTH_URL is missing. Add your app URL to .env.local.",
  );
}

// OAuth providers are optional. They are enabled only when both credentials exist.
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

export const auth = betterAuth({
  appName: "BazarDor",
  baseURL,
  secret,
  trustedOrigins: [baseURL],
  database: mongodbAdapter(mongoDb, {
    // Atlas is a replica-set cluster, so pass the client to enable transactions.
    client: mongoClient,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
  },
  socialProviders: {
    ...(googleClientId && googleClientSecret
      ? {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        }
      : {}),
    ...(githubClientId && githubClientSecret
      ? {
          github: {
            clientId: githubClientId,
            clientSecret: githubClientSecret,
          },
        }
      : {}),
  },
});

export type AuthSession = typeof auth.$Infer.Session;
