import { redirect } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { ProfileUpdateForm } from "@/components/profile-view";
import { fallbackProducts } from "@/data/fallback-products";
import { getCurrentSession } from "@/lib/auth-server";

export default async function ProfileUpdatePage() {
  const session = await getCurrentSession();

  if (!session) redirect("/signin");

  return (
    <SiteShell products={fallbackProducts}>
      <ProfileUpdateForm initialName={session.user.name} />
    </SiteShell>
  );
}
