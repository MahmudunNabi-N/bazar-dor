import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Link href="/" className="footer-logo"><span>🛒</span> বাজার দর</Link>
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        </div>
        <p className="footer-note">সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} বাজার দর (Bazar Dor). সর্বস্বত্ব সংরক্ষিত।</span>
        <span>প্রতিদিনের বাজার, এবার হাতের মুঠোয়।</span>
      </div>
    </footer>
  );
}
