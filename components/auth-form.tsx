
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export const AuthForm = ({ mode }: { mode: "signin" | "signup" }) => {
  const isSignup = mode === "signup";
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSocialSignIn = async (provider: "google" | "github") => {
  try {
    setIsSubmitting(true);

    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/profile",
    });

    if (error) {
      toast.error(error.message ?? "কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।"
    );
  } finally {
    setIsSubmitting(false);
  }
};

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

    try {
      setIsSubmitting(true);

      if (isSignup) {
        // Sign Up
        const { data, error } = await authClient.signUp.email(
          {
            name: name.trim(),
            email: normalizedEmail,
            password,
            callbackURL: "/profile",
          },
          {
            onRequest: () => {
              setIsSubmitting(true);
            },

            onSuccess: () => {
              toast.success("আপনার অ্যাকাউন্ট তৈরি হয়েছে!");
              router.replace("/profile");
              router.refresh();
            },

            onError: (ctx) => {
              toast.error(ctx.error.message);
            },
          }
        );

        if (error) return;

      } else {
        // Sign In
        const { data, error } = await authClient.signIn.email(
          {
            email: normalizedEmail,
            password,
            callbackURL: "/profile",
            rememberMe: true,
          },
          {
            onRequest: () => {
              setIsSubmitting(true);
            },

            onSuccess: () => {
              toast.success("সফলভাবে সাইন ইন করেছেন!");
              router.replace("/profile");
              router.refresh();
            },

            onError: (ctx) => {
              toast.error(ctx.error.message);
            },
          }
        );

        if (error) return;
      }

    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।";

      toast.error(message);

    } finally {
      setIsSubmitting(false);
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
          <span className="auth-illustration-label">
            প্রতিদিনের বাজার, সঠিক হিসাব
          </span>
        </div>


        <div className="auth-illustration-copy">
          <strong>
            বাজার বুঝে
            <br />
            সাশ্রয়ী কেনাকাটা।
          </strong>
          <span>দাম জানুন, তুলনা করুন, তারপর কিনুন।</span>
        </div>
      </div>

      <div className="auth-form-side">
        <Link href="/" className="auth-back-link">
          ← হোম পেজে ফিরে যান
        </Link>

        <div className="auth-form-card">
          <span className="auth-mini-logo">🛒</span>
          <span className="section-eyebrow">বাজার দর অ্যাকাউন্ট</span>

          <h1>
            {isSignup ? "নতুন অ্যাকাউন্ট তৈরি করুন" : "আবার স্বাগতম"}
          </h1>

          <p>
            {isSignup
              ? "আপনার তথ্য দিয়ে নিবন্ধন ফর্মটি পূরণ করুন।"
              : "আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন।"}
          </p>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {isSignup && (
              <label>
                আপনার নাম
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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

          <div className="auth-divider">
            <span>অথবা</span>
          </div>

          <div className="auth-socials flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={isSubmitting}
              className="btn w-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
            >
              <i className="fa-brands fa-google"></i>
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={isSubmitting}
              className="btn w-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
            >
              <i className="fa-brands fa-github"></i>
              Continue with GitHub
            </button>
          </div>

          <p className="auth-switch">
            {isSignup
              ? "আগে থেকেই অ্যাকাউন্ট আছে?"
              : "নতুন এখানে এসেছেন?"}{" "}
            <Link href={isSignup ? "/signin" : "/signup"}>
              {isSignup ? "সাইন ইন করুন" : "অ্যাকাউন্ট তৈরি করুন"}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
