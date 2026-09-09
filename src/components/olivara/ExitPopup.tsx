import { useEffect, useState } from "react";
import { OrderForm } from "./OrderForm";

export function ExitPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("olivara-exit")) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const fire = () => {
      setOpen(true);
      sessionStorage.setItem("olivara-exit", "1");
      window.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
    };
    const onScroll = () => {
      if (timer) return;
      timer = setTimeout(fire, 20000);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
    };
  }, []);


  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-foreground/50 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="my-auto w-full max-w-sm rounded-3xl border border-gold-soft bg-card p-6 text-center shadow-lift">
        <p className="text-sm font-bold text-accent">🔥 عرض خاص</p>
        <h3 className="mt-2 text-xl font-extrabold text-foreground">مهلاً! ما تفوتش الفرصة</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          باقة OLIVARA الكاملة بـ <span dir="ltr" className="font-bold text-primary">189 DH</span>{" "}
          فقط مع توصيل مجاني.
        </p>
        <div className="mt-5 text-right">
          <OrderForm compact />
        </div>
      </div>
    </div>
  );
}
