import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { SiteShell } from "@/components/site-shell";
import { fallbackProducts } from "@/data/fallback-products";
import { getCurrentSession } from "@/lib/auth-server";

export default async function SignUpPage() {
  const session = await getCurrentSession();
  if (session) redirect("/profile");

  return <SiteShell products={fallbackProducts}><AuthForm mode="signup" /></SiteShell>;
}
