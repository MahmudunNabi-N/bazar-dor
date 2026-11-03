import { redirect } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { ProfileView } from "@/components/profile-view";
import { fallbackProducts } from "@/data/fallback-products";
import { getCurrentSession } from "@/lib/auth-server";

export default async function ProfilePage() {
  const session = await getCurrentSession();

  if (!session) redirect("/signin");

  return (
    <SiteShell products={fallbackProducts}>
      <ProfileView user={{ name: session.user.name, email: session.user.email }} />
    </SiteShell>
  );
}
