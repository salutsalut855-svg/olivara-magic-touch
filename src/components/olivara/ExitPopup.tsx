import { useEffect, useState } from "react";

export function ExitPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("olivara-exit")) return;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setOpen(true);
        sessionStorage.setItem("olivara-exit", "1");
        document.removeEventListener("mouseout", onLeave);
      }
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border border-gold-soft bg-card p-6 text-center shadow-lift">
        <p className="text-sm font-bold text-accent">🔥 عرض خاص</p>
        <h3 className="mt-2 text-xl font-extrabold text-foreground">قبل أن تغادر...</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          احصل على أفضل عرض: عبوتان بـ<span className="font-bold text-primary">129 DH</span>.
        </p>
        <a
          href="#order"
          onClick={() => setOpen(false)}
          className="mt-5 block rounded-2xl bg-olive-gradient py-3 text-base font-extrabold text-primary-foreground shadow-soft"
        >
          اطلب الآن
        </a>
        <button
          onClick={() => setOpen(false)}
          className="mt-3 text-xs text-muted-foreground underline"
        >
          لا، شكراً
        </button>
      </div>
    </div>
  );
}