# BazarDor — Next.js App Router + Better Auth + MongoDB Atlas

BazarDor is a Bengali market-price frontend built with Next.js App Router, React, TypeScript and Tailwind CSS. Authentication uses Better Auth with MongoDB Atlas.

## 1. Requirements

- Node.js 20.9 or newer (Node.js 24 is supported by the project runtime requirement)
- npm
- A MongoDB Atlas cluster and database user

## 2. Install and run

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## 3. Authentication features

- Email/password sign-up and sign-in (minimum password length: 8 characters)
- Session cookie management through Better Auth
- Sign out from the header
- Server-side protection for `/profile` and `/profile/update`
- Redirect signed-in users away from `/signin` and `/signup`
- Profile name update through Better Auth
- Google and GitHub OAuth



## 4. Useful commands

```bash
npm run dev       # development server
npm run typecheck # TypeScript validation
npm run build     # production build
npm start         # run production build
```
