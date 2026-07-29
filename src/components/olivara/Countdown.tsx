import { useEffect, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Countdown({ compact = false }: { compact?: boolean }) {
  const [left, setLeft] = useState(4 * 3600 + 32 * 60 + 11);

  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(left / 3600);
  const m = Math.floor((left % 3600) / 60);
  const s = left % 60;

  const box = compact
    ? "min-w-9 rounded-lg bg-primary-deep px-1.5 py-0.5 text-sm font-bold text-primary-foreground"
    : "min-w-16 rounded-xl bg-olive-gradient px-3 py-2 text-2xl font-extrabold text-primary-foreground shadow-soft";

  return (
    <div className="flex items-center gap-2" dir="ltr">
      <span className={box}>{pad(h)}</span>
      <span className="text-accent">:</span>
      <span className={box}>{pad(m)}</span>
      <span className="text-accent">:</span>
      <span className={box}>{pad(s)}</span>
    </div>
  );
}