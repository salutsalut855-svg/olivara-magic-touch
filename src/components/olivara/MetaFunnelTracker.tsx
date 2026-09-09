import { useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { reportMetaEvent } from "@/lib/meta.functions";
import {
  browserMetaContext,
  ensureMetaPixel,
  newEventId,
  trackLandingView,
  trackPageView,
  trackViewOrderForm,
} from "@/lib/meta-pixel";

export function MetaFunnelTracker() {
  const report = useServerFn(reportMetaEvent);

  useEffect(() => {
    ensureMetaPixel();
    const ctx = browserMetaContext();

    const pageViewId = newEventId("pv");
    trackPageView(pageViewId);
    void report({ data: { eventName: "PageView", eventId: pageViewId, ...ctx } });

    const { firedView, firedFirst } = trackLandingView();
    if (firedView) {
      void report({ data: { eventName: "ViewContent", eventId: newEventId("vc"), ...ctx } });
    }
    if (firedFirst) {
      void report({ data: { eventName: "FirstVisit", eventId: newEventId("fv"), ...ctx } });
    }

    const el = document.getElementById("order");
    if (el) {
      const reveal = () => {
        if (trackViewOrderForm()) {
          void report({
            data: { eventName: "ViewOrderForm", eventId: newEventId("vo"), ...browserMetaContext() },
          });
        }
      };
      if (window.location.hash === "#order") reveal();
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          reveal();
          io.disconnect();
        },
        { threshold: 0.2 },
      );
      io.observe(el);
      return () => io.disconnect();
    }
  }, [report]);

  return null;
}
