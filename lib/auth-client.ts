"use client";

import { createAuthClient } from "better-auth/react";

// The client and auth API use the same domain, so a baseURL is not required.
export const authClient = createAuthClient();
