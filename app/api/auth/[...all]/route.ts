import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

// Better Auth needs the Node.js runtime because it uses the MongoDB Node driver.
export const runtime = "nodejs";

export const { GET, POST } = toNextJsHandler(auth);
