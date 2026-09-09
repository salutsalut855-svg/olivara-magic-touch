import { useState, type FormEvent } from "react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { submitOrder } from "@/lib/orders.functions";
import { reportMetaEvent } from "@/lib/meta.functions";
import {
  browserMetaContext,
  offerValue,
  readCookie,
  newEventId,
  trackInitiateCheckout,
  trackLead,
  trackPurchasePixel,
} from "@/lib/meta-pixel";

const schema = z.object({
  name: z.string().trim().min(3, "المرجو كتابة الاسم الكامل").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\s-]{9,15}$/, "رقم الهاتف غير صحيح"),
  city: z.string().trim().min(2, "المرجو كتابة المدينة").max(60),
  address: z.string().trim().min(5, "المرجو كتابة العنوان").max(200),
});

const OFFERS = [
  {
    id: "pack" as const,
    title: "الباقة الأساسية 3 في 1",
    desc: "سبراي + بودرة + فرشاة",
    price: "189 DH",
    old: "279 DH",
  },
  {
    id: "duo" as const,
    title: "باقة عبوتين (الأكثر مبيعاً)",
    desc: "2 سبراي + بودرة + فرشاة",
    price: "229 DH",
    old: "378 DH",
  },
];

export function OrderForm({ compact = false }: { compact?: boolean }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [offer, setOffer] = useState<"pack" | "duo">("pack");
  const send = useServerFn(submitOrder);
  const report = useServerFn(reportMetaEvent);

  function capiEvent(eventName: "InitiateCheckout" | "Lead", offerId: "pack" | "duo") {
    void report({
      data: {
        eventName,
        eventId: newEventId(eventName === "Lead" ? "lead" : "ic"),
        offer: offerId,
        ...browserMetaContext(),
      },
    });
  }

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
    if (trackLead(offer)) capiEvent("Lead", offer);
    try {
      const eventId = `purchase_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
      const value = offerValue(offer);
      await send({
        data: {
          ...parsed.data,
          offer,
          eventId,
          eventSourceUrl: window.location.href,
          fbp: readCookie("_fbp"),
          fbc: readCookie("_fbc"),
        },
      });
      trackPurchasePixel(eventId, value);
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
          غادي نتواصلو معاك عبر الهاتف باش نأكدو العنوان قبل إرسال الشحنة. شكراً على ثقتك.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={() => {
        if (trackInitiateCheckout(offer)) capiEvent("InitiateCheckout", offer);
      }}
      onInput={() => {
        if (trackInitiateCheckout(offer)) capiEvent("InitiateCheckout", offer);
      }}
      noValidate
      className="space-y-4 text-right"
    >
      <div>
        <p className="mb-2 text-sm font-bold text-foreground">اختار الباقة</p>
        <div className="grid gap-3">
          {OFFERS.map((o) => (
            <button
              type="button"
              key={o.id}
              onClick={() => {
                setOffer(o.id);
                if (trackInitiateCheckout(o.id)) capiEvent("InitiateCheckout", o.id);
              }}
              className={`flex items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-right transition ${
                offer === o.id
                  ? "border-primary bg-cream shadow-soft"
                  : "border-border bg-background"
              }`}
            >
              <span className="min-w-0">
                <span className="block text-sm font-extrabold text-foreground">{o.title}</span>
                <span className="block text-xs text-muted-foreground">{o.desc}</span>
              </span>
              <span className="shrink-0 text-left">
                <span dir="ltr" className="block text-base font-black text-primary">
                  {o.price}
                </span>
                <span dir="ltr" className="block text-xs text-muted-foreground line-through">
                  {o.old}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {[
        { name: "name", label: "الاسم والنسب", type: "text", ph: "مثال: أمينة بنعلي" },
        { name: "phone", label: "رقم الهاتف / واتساب", type: "tel", ph: "06XXXXXXXX" },
        { name: "city", label: "المدينة", type: "text", ph: "الدار البيضاء" },
        { name: "address", label: "العنوان أو الحي", type: "text", ph: "الحي، الشارع، الرقم" },
      ].map((f) => (
        <div key={f.name}>
          <label
            htmlFor={`${compact ? "m-" : ""}${f.name}`}
            className="mb-1.5 block text-sm font-bold text-foreground"
          >
            {f.label}
          </label>
          <input
            id={`${compact ? "m-" : ""}${f.name}`}
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

      <div className="rounded-2xl border border-gold-soft bg-cream px-4 py-3 text-sm font-bold text-foreground">
        {OFFERS.find((o) => o.id === offer)!.title} —{" "}
        <span dir="ltr">{OFFERS.find((o) => o.id === offer)!.price}</span> (توصيل مجاني)
      </div>


      <button
        type="submit"
        disabled={sending}
        className="w-full animate-[pulse_2.4s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-2xl bg-olive-gradient py-4 text-lg font-extrabold text-primary-foreground shadow-lift transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
      >
        {sending ? "كنسجلو الطلب..." : "تأكيد الطلب الآن 🛍️"}
      </button>
      {serverError && (
        <p className="text-center text-xs font-medium text-destructive">{serverError}</p>
      )}
      <p className="text-center text-xs text-muted-foreground">
        سيتصل بك فريقنا لتأكيد العنوان قبل إرسال الشحنة.
      </p>
    </form>
  );
}
