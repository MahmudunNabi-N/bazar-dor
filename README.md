# BazarDor — Next.js App Router + Better Auth + MongoDB Atlas

BazarDor is a Bengali market-price frontend built with Next.js App Router, React, TypeScript and Tailwind CSS. Authentication uses Better Auth with MongoDB Atlas.

## 1. Requirements

- Node.js 20.9 or newer (Node.js 24 is supported by the project runtime requirement)
- npm
- A MongoDB Atlas cluster and database user

## 3. Install and run

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## 4. Authentication features

- Email/password sign-up and sign-in (minimum password length: 8 characters)
- Session cookie management through Better Auth
- Sign out from the header
- Server-side protection for `/profile` and `/profile/update`
- Redirect signed-in users away from `/signin` and `/signup`
- Profile name update through Better Auth
- Google and GitHub OAuth

Google/GitHub buttons are not active until the related provider credentials and matching `NEXT_PUBLIC_*_AUTH_ENABLED=true` setting are configured in `.env.local`. Set the OAuth callback URL in each provider console to `http://localhost:3000/api/auth/callback/google` or `http://localhost:3000/api/auth/callback/github`; add the matching deployed URL too when using production OAuth.

## 5. Production deployment

Add the same environment variables to the hosting provider (for example, Vercel Project Settings > Environment Variables):

- `MONGODB_URL`
- `BETTER_AUTH_SECRET` (use a newly generated production secret)
- `BETTER_AUTH_URL` (your deployed HTTPS site URL)
- OAuth credentials and public flags, only if using OAuth

In MongoDB Atlas, allow your hosting platform to reach the cluster using an appropriate Network Access rule. Do not expose your database username/password or Better Auth secret in frontend code or `NEXT_PUBLIC_` variables.

## 6. Useful commands

```bash
npm run dev       # development server
npm run typecheck # TypeScript validation
npm run build     # production build
npm start         # run production build
```
