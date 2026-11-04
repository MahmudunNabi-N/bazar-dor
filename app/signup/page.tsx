
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { AuthForm } from "@/components/auth-form";
import { SiteShell } from "@/components/site-shell";
import { fallbackProducts } from "@/data/fallback-products";
import { auth } from "@/lib/auth";

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/profile");

  return (
    <SiteShell products={fallbackProducts}>
      <AuthForm mode="signup" />
    </SiteShell>
  );
}
