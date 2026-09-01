import { useEffect, useState } from "react";
import { Countdown } from "./Countdown";

export function StickyBars() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed inset-x-0 top-0 z-40 hidden border-b md:block border-border bg-background/95 backdrop-blur transition-transform duration-300 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="truncate text-sm font-bold text-foreground">
              باقة 3 في 1 <span dir="ltr" className="text-primary">189 DH</span>
            </span>
            <span className="hidden text-xs text-muted-foreground line-through sm:inline" dir="ltr">
              279 DH
            </span>
          </div>
          <div className="hidden sm:block">
            <Countdown compact />
          </div>
          <a
            href="#order"
            className="shrink-0 rounded-full bg-olive-gradient px-4 py-2 text-sm font-bold text-primary-foreground shadow-soft"
          >
            اطلب الآن
          </a>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/20 bg-olive-gradient p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.15)] md:hidden">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <p className="min-w-0 truncate text-sm font-bold text-primary-foreground">
            باقة 3 في 1 بـ <span dir="ltr">189 DH</span> (توصيل فابور)
          </p>
          <a
            href="#order"
            className="shrink-0 rounded-2xl bg-background px-5 py-3 text-center text-base font-extrabold text-primary shadow-lift"
          >
            اطلب الآن
          </a>
        </div>
      </div>
    </>
  );
}
