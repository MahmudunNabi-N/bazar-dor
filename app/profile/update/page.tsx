

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { SiteShell } from "@/components/site-shell";
import { ProfileUpdateForm } from "@/components/profile-view";
import { fallbackProducts } from "@/data/fallback-products";
import { auth } from "@/lib/auth";

export default async function ProfileUpdatePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/signin");

  return (
    <SiteShell products={fallbackProducts}>
      <ProfileUpdateForm initialName={session.user.name} />
    </SiteShell>
  );
}

