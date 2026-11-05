# 🛒 বাজার দর | BazarDor

### Your Smart Companion for Everyday Market Prices

**BazarDor** is a Bengali market-price frontend application built to help users explore everyday market products and their prices through a simple and user-friendly interface.

The application provides product browsing, category-based navigation, and secure user authentication with a personalized profile experience.

---

## ✨ Key Features

1. **🔐 Secure Authentication** — Sign up and sign in using email and password with Better Auth.
2. **🌐 Social Login** — Google and GitHub OAuth authentication support.
3. **🛍️ Product Browsing** — Explore available market products and their prices.
4. **📂 Category-Based Navigation** — Browse products through different categories.
5. **👤 User Profile Management** — Access protected profile pages and update personal information.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js (App Router) | Frontend Framework |
| React | UI Development |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Better Auth | Authentication |
| MongoDB Atlas | Database |
| Google OAuth | Social Authentication |
| GitHub OAuth | Social Authentication |

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/MahmudunNabi-N/bazar-dor.git
```

### 2. Navigate to the Project Folder

```bash
cd bazar-dor
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add the required environment variables:

```env
MONGODB_URL=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true
NEXT_PUBLIC_GITHUB_AUTH_ENABLED=true
```

Add your own credentials and configuration values. OAuth credentials and public flags are needed only if you want to enable the respective social login providers.

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run typecheck` | Run TypeScript checks |

---

## 🌍 Deployment

The project can be deployed using [Vercel](https://vercel.com/).

Make sure to configure all required environment variables in your Vercel project settings and update the OAuth callback URLs for your production domain.

---

## 👨‍💻 Developer

**Mahmudun Nabi Patwary**

- GitHub: [@MahmudunNabi-N](https://github.com/MahmudunNabi-N)
- Project Repository: [BazarDor](https://github.com/MahmudunNabi-N/bazar-dor)
- Website Link : [bazar-dor-bangla](https://bazar-dor-bangla.vercel.app)

---

⭐ If you find this project interesting, consider giving it a star!

**Built with ❤️ using Next.js**
