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
        className={`fixed inset-x-0 top-0 z-40 border-b border-border bg-background/95 backdrop-blur transition-transform duration-300 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="truncate text-sm font-bold text-foreground">
              عبوتان <span dir="ltr" className="text-primary">129 DH</span>
            </span>
            <span className="hidden text-xs text-muted-foreground line-through sm:inline" dir="ltr">158 DH</span>
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

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <a
          href="#order"
          className="block rounded-2xl bg-olive-gradient py-3.5 text-center text-base font-extrabold text-primary-foreground shadow-lift"
        >
          اطلب الآن — الدفع عند الاستلام
        </a>
      </div>
    </>
  );
}