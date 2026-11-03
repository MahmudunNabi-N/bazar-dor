"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type SocialProvider = "google" | "github";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (isSignup && !name.trim()) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      toast.error("সঠিক ইমেইল ঠিকানা লিখুন।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = isSignup
        ? await authClient.signUp.email({
            name: name.trim(),
            email: normalizedEmail,
            password,
            callbackURL: "/profile",
          })
        : await authClient.signIn.email({
            email: normalizedEmail,
            password,
            callbackURL: "/profile",
            rememberMe: true,
          });

      if (result.error) {
        toast.error(result.error.message || "Authentication সম্পন্ন হয়নি।");
        return;
      }

      toast.success(
        isSignup ? "আপনার অ্যাকাউন্ট তৈরি হয়েছে!" : "সফলভাবে সাইন ইন করেছেন!",
      );
      router.replace("/profile");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSocialSignIn(provider: SocialProvider) {
    const isConfigured =
      provider === "google"
        ? process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true"
        : process.env.NEXT_PUBLIC_GITHUB_AUTH_ENABLED === "true";

    if (!isConfigured) {
      toast.error(
        `${provider === "google" ? "Google" : "GitHub"} login চালু করতে .env.local-এ OAuth credentials configure করুন।`,
      );
      return;
    }

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/profile",
      });

      if (error) toast.error(error.message || "Social sign-in ব্যর্থ হয়েছে।");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Social sign-in ব্যর্থ হয়েছে।",
      );
    }
  }

  return (
    <main className="auth-page shell">
      <div className="auth-illustration">
        <div className="auth-illustration-inner">
          <div className="auth-decoration decor-a">🥬</div>
          <div className="auth-decoration decor-b">🍅</div>
          <div className="auth-decoration decor-c">🥕</div>
          <div className="auth-basket">🧺</div>
          <span className="auth-illustration-label">প্রতিদিনের বাজার, সঠিক হিসাব</span>
        </div>
        <div className="auth-illustration-copy">
          <strong>বাজার বুঝে<br />সাশ্রয়ী কেনাকাটা।</strong>
          <span>দাম জানুন, তুলনা করুন, তারপর কিনুন।</span>
        </div>
      </div>
      <div className="auth-form-side">
        <Link href="/" className="auth-back-link">← হোম পেজে ফিরে যান</Link>
        <div className="auth-form-card">
          <span className="auth-mini-logo">🛒</span>
          <span className="section-eyebrow">বাজার দর অ্যাকাউন্ট</span>
          <h1>{isSignup ? "নতুন অ্যাকাউন্ট তৈরি করুন" : "আবার স্বাগতম"}</h1>
          <p>
            {isSignup
              ? "আপনার তথ্য দিয়ে নিবন্ধন ফর্মটি পূরণ করুন।"
              : "আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন।"}
          </p>
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {isSignup && (
              <label>
                আপনার নাম
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="আপনার নাম লিখুন"
                  autoComplete="name"
                  required
                />
              </label>
            )}
            <label>
              ইমেইল ঠিকানা
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                autoComplete="email"
                required
              />
            </label>
            <label>
              পাসওয়ার্ড
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                autoComplete={isSignup ? "new-password" : "current-password"}
                minLength={8}
                required
              />
            </label>
            <button
              type="submit"
              className="button button-primary auth-submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "অপেক্ষা করুন..."
                : isSignup
                  ? "অ্যাকাউন্ট তৈরি করুন"
                  : "সাইন ইন করুন"}
              <span>↗</span>
            </button>
          </form>
          <div className="auth-divider"><span>অথবা</span></div>
          <div className="auth-socials">
            <button type="button" onClick={() => handleSocialSignIn("google")}>
              <b>G</b> Google
            </button>
            <button type="button" onClick={() => handleSocialSignIn("github")}>
              <b>⌘</b> GitHub
            </button>
          </div>
          <p className="auth-switch">
            {isSignup ? "আগে থেকেই অ্যাকাউন্ট আছে?" : "নতুন এখানে এসেছেন?"}{" "}
            <Link href={isSignup ? "/signin" : "/signup"}>
              {isSignup ? "সাইন ইন করুন" : "অ্যাকাউন্ট তৈরি করুন"}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
