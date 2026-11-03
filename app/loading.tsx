import { SkeletonGrid } from "@/components/skeleton-grid";

export default function Loading() {
  return (
    <main className="shell page-main loading-page">
      <div className="loading-heading"><div className="skeleton skeleton-line short" /><div className="skeleton skeleton-line medium" /></div>
      <SkeletonGrid count={8} />
    </main>
  );
}
