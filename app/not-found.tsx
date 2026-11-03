import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <span className="not-found-emoji">🧺</span>
        <span className="section-eyebrow">404 · পেজ পাওয়া যায়নি</span>
        <h1>এই পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!</h1>
        <p>আপনি যে পণ্য বা পৃষ্ঠাটি খুঁজছেন, সেটি হয়তো সরানো হয়েছে অথবা ঠিকানাটি সঠিক নয়।</p>
        <Link href="/" className="button button-primary">হোম পেজে ফিরে যান <span>↗</span></Link>
      </div>
    </main>
  );
}
