import { Smartphone } from "lucide-react";

export function DesktopBlock() {
  return (
    <div className="fixed inset-0 z-[100] hidden place-items-center bg-olive-gradient p-8 text-center md:grid">
      <div className="max-w-md rounded-3xl border border-gold-soft bg-card p-8 shadow-lift">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary/10">
          <Smartphone className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold text-foreground">
          هاد الموقع خاص بالهاتف 📱
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          باش تشوف باقة OLIVARA وتكمل الطلب، افتح الموقع من الهاتف. شكراً على تفهمك 🌿
        </p>
      </div>
    </div>
  );
}
