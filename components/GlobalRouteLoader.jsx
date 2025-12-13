"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

export default function GlobalRouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Trigger loader on route change
    setLoading(true);

    // Minimal delay to show loader (optional)
    const timer = setTimeout(() => setLoading(false), 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <BarLoader width="100%" color="#4f46e5" />
    </div>
  );
}
