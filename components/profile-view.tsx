"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type ProfileUser = {
  name: string;
  email: string;
};

export function ProfileView({ user }: { user: ProfileUser }) {
  const displayName = user.name || "বাজার দর ব্যবহারকারী";

  return (
    <main className="shell page-main profile-page">
      <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><span>আমার প্রোফাইল</span></div>
      <section className="profile-card">
        <div className="profile-cover">
          <span>🛒</span>
          <div><span className="section-eyebrow">ব্যক্তিগত তথ্য</span><h1>আমার প্রোফাইল</h1></div>
        </div>
        <div className="profile-content">
          <div className="profile-avatar">{displayName.trim().charAt(0) || "ব"}</div>
          <div className="profile-user-info">
            <span className="section-eyebrow">প্রোফাইল নাম</span>
            <h2>{displayName}</h2>
            <p>{user.email}</p>
          </div>
          <Link href="/profile/update" className="button button-primary">তথ্য আপডেট করুন <span>↗</span></Link>
        </div>
      </section>
    </main>
  );
}

export function ProfileUpdateForm({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await authClient.updateUser({ name: trimmedName });

      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি।");
        return;
      }

      setSaved(true);
      toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে।");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "প্রোফাইল আপডেট করা যায়নি।",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="shell page-main profile-update-page">
      <div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href="/profile">আমার প্রোফাইল</Link><span>/</span><span>তথ্য আপডেট</span></div>
      <section className="profile-update-card">
        <span className="profile-update-icon">✎</span>
        <span className="section-eyebrow">প্রোফাইল সেটিংস</span>
        <h1>আপনার তথ্য আপডেট করুন</h1>
        <p>আপনার প্রোফাইলে যে নামটি দেখাতে চান সেটি লিখুন।</p>
        <form onSubmit={handleSubmit} className="profile-update-form">
          <label htmlFor="profile-name">নাম</label>
          <input
            id="profile-name"
            value={name}
            onChange={(event) => { setName(event.target.value); setSaved(false); }}
            placeholder="আপনার নাম লিখুন"
            maxLength={100}
            required
          />
          <button className="button button-primary" type="submit" disabled={isSaving}>
            {isSaving ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"} <span>↗</span>
          </button>
          {saved && <p className="inline-success">✓ আপনার নাম সফলভাবে আপডেট হয়েছে।</p>}
        </form>
        <Link href="/profile" className="profile-cancel-link">← প্রোফাইলে ফিরে যান</Link>
      </section>
    </main>
  );
}
