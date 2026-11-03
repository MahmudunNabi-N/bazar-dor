export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="product-grid skeleton-grid" aria-label="পণ্য লোড হচ্ছে" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton skeleton-icon" />
          <div className="skeleton skeleton-line short" />
          <div className="skeleton skeleton-line medium" />
          <div className="skeleton skeleton-line long" />
          <div className="skeleton-bottom"><div className="skeleton skeleton-line medium" /><div className="skeleton skeleton-dot" /></div>
        </div>
      ))}
    </div>
  );
}
