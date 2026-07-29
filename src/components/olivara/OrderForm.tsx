import { useState, type FormEvent } from "react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { submitOrder } from "@/lib/orders.functions";

const schema = z.object({
  name: z.string().trim().min(3, "المرجو كتابة الاسم الكامل").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\s-]{9,15}$/, "رقم الهاتف غير صحيح"),
  city: z.string().trim().min(2, "المرجو كتابة المدينة").max(60),
  address: z.string().trim().min(5, "المرجو كتابة العنوان").max(200),
  offer: z.enum(["one", "two"]),
});

export function OrderForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");
  const send = useServerFn(submitOrder);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (next[String(i.path[0])] = i.message));
      setErrors(next);
      return;
    }
    setErrors({});
    setServerError("");
    setSending(true);
    try {
      await send({ data: parsed.data });
      setDone(true);
    } catch {
      setServerError("وقع مشكل فإرسال الطلب. المرجو المحاولة مرة أخرى.");
    } finally {
      setSending(false);
    }
  }

  const field =
    "w-full rounded-2xl border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15";

  if (done) {
    return (
      <div className="rounded-3xl border border-gold-soft bg-cream p-8 text-center shadow-soft">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-olive-gradient text-2xl text-primary-foreground">
          ✓
        </div>
        <h3 className="mt-4 text-xl font-extrabold text-foreground">تم تسجيل طلبك</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          غادي نتواصلو معاك عبر الهاتف باش نأكدو الطلب. شكراً على ثقتك.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 text-right">
      {[
        { name: "name", label: "الاسم الكامل", type: "text", ph: "مثال: أمينة بنعلي" },
        { name: "phone", label: "رقم الهاتف", type: "tel", ph: "06XXXXXXXX" },
        { name: "city", label: "المدينة", type: "text", ph: "الدار البيضاء" },
        { name: "address", label: "العنوان", type: "text", ph: "الحي، الشارع، الرقم" },
      ].map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="mb-1.5 block text-sm font-bold text-foreground">
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            placeholder={f.ph}
            maxLength={200}
            className={field}
          />
          {errors[f.name] && (
            <p className="mt-1 text-xs font-medium text-destructive">{errors[f.name]}</p>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="offer" className="mb-1.5 block text-sm font-bold text-foreground">
          اختر العرض
        </label>
        <select id="offer" name="offer" defaultValue="two" className={field}>
          <option value="one">عبوة واحدة - 79 DH</option>
          <option value="two">عبوتان - 129 DH</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-2xl bg-olive-gradient py-4 text-lg font-extrabold text-primary-foreground shadow-lift transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
      >
        {sending ? "كنسجلو الطلب..." : "تأكيد الطلب"}
      </button>
      {serverError && (
        <p className="text-center text-xs font-medium text-destructive">{serverError}</p>
      )}
      <p className="text-center text-xs text-muted-foreground">
        💵 الدفع عند الاستلام • 🚚 التوصيل لجميع مدن المغرب
      </p>
    </form>
  );
}