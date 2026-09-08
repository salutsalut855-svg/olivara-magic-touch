import { useEffect } from "react";
import { trackLandingView, trackViewOrderForm } from "@/lib/meta-pixel";

export function MetaFunnelTracker() {
  useEffect(() => {
    trackLandingView();

    const el = document.getElementById("order");
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        trackViewOrderForm();
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return null;
}
