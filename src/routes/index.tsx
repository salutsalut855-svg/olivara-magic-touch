import { createFileRoute } from "@tanstack/react-router";
import bottle from "@/assets/olivara-bottle.png.asset.json";
import flatlay from "@/assets/olivara-flatlay.png.asset.json";
import { Countdown } from "@/components/olivara/Countdown";
import { StickyBars } from "@/components/olivara/StickyBars";
import { FloatingActions } from "@/components/olivara/FloatingActions";
import { ExitPopup } from "@/components/olivara/ExitPopup";
import { OrderForm } from "@/components/olivara/OrderForm";
import { useReveal } from "@/components/olivara/useReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OLIVARA — زيت طبيعي لتقوية الشعر | 79 DH" },
      {
        name: "description",
        content:
          "OLIVARA سبراي طبيعي بزيت الزيتون والأرغان كيساعد على العناية بالشعر. الدفع عند الاستلام والتوصيل لجميع مدن المغرب.",
      },
      { property: "og:title", content: "OLIVARA — زيت طبيعي لتقوية الشعر" },
      {
        property: "og:description",
        content: "رجع الحيوية لشعرك بطريقة طبيعية. عرض خاص: عبوتان بـ129 DH.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const benefits = [
  { icon: "🌿", text: "يساعد على تقليل مظهر تساقط الشعر" },
  { icon: "✨", text: "يمنح الشعر مظهراً أكثر كثافة" },
  { icon: "💧", text: "يرطب الشعر الجاف" },
  { icon: "💫", text: "يعيد اللمعان الطبيعي" },
  { icon: "🖐️", text: "سهل الاستعمال" },
  { icon: "👩‍🦰", text: "مناسب للنساء والرجال" },
];

const steps = [
  { n: "1", icon: "🧴", text: "رش المنتج على فروة الرأس." },
  { n: "2", icon: "💆", text: "دلّك لمدة دقيقة أو دقيقتين." },
  { n: "3", icon: "📅", text: "استعمله بانتظام للحصول على أفضل النتائج." },
];

const ingredients = [
  { name: "زيت الزيتون", icon: "🫒", d: "غني بمضادات الأكسدة" },
  { name: "زيت الأرغان", icon: "🌰", d: "يساهم في نعومة الشعر" },
  { name: "زيت إكليل الجبل", icon: "🌱", d: "ينعش فروة الرأس" },
  { name: "البيوتين", icon: "💊", d: "يدعم مظهر الشعر" },
  { name: "فيتامين E", icon: "🌟", d: "يساعد على الترطيب" },
];

const testimonials = [
  { q: "لاحظت فرق كبير بعد أسابيع قليلة.", a: "أمينة، الدار البيضاء" },
  { q: "الشعر ديالي ولا كيبان صحي بزاف.", a: "يوسف، الرباط" },
  { q: "منتج رائع وسهل الاستعمال.", a: "سارة، مراكش" },
];

const trust = [
  { icon: "🚚", t: "التوصيل لجميع أنحاء المغرب" },
  { icon: "💵", t: "الدفع عند الاستلام" },
  { icon: "🔒", t: "طلب آمن 100%" },
  { icon: "✅", t: "جودة عالية" },
];

const faq = [
  { q: "هل مناسب للرجال والنساء؟", a: "نعم." },
  {
    q: "كم يستغرق ظهور النتائج؟",
    a: "تختلف النتائج من شخص لآخر حسب طبيعة الشعر والاستعمال المنتظم.",
  },
  { q: "كيف يتم الدفع؟", a: "الدفع عند الاستلام." },
  { q: "هل يوجد توصيل؟", a: "نعم، لجميع مدن المغرب." },
];

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="reveal mb-8 text-center">
      <p className="text-sm font-bold tracking-widest text-accent">{kicker}</p>
      <h2 className="mt-2 text-2xl font-extrabold text-foreground sm:text-3xl">{title}</h2>
      <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold-gradient" />
    </div>
  );
}

function Index() {
  const root = useReveal<HTMLDivElement>();

  return (
    <div ref={root} className="overflow-x-hidden bg-background">
      <StickyBars />
      <FloatingActions />
      <ExitPopup />

      {/* HERO */}
      <header className="relative bg-cream pb-14 pt-10">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 md:grid-cols-2 md:items-center">
          <div className="reveal order-2 text-center md:order-1 md:text-right">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold-soft bg-background px-4 py-1.5 text-xs font-bold text-accent-foreground">
              🫒 OLIVARA HAIR CARE
            </p>
            <h1 className="mt-4 text-3xl font-black leading-tight text-foreground sm:text-4xl md:text-5xl">
              رجع الحيوية لشعرك <span className="text-primary">بطريقة طبيعية</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              OLIVARA كيساعد على العناية بالشعر، كيخلي الشعر يبان أكثر صحة، أنعم وأكثر لمعان مع
              الاستعمال المنتظم.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 md:items-start">
              <a
                href="#order"
                className="w-full rounded-2xl bg-olive-gradient px-8 py-4 text-center text-lg font-extrabold text-primary-foreground shadow-lift transition-transform hover:scale-[1.02] sm:w-auto"
              >
                اطلب الآن
              </a>
              <p className="text-sm text-muted-foreground">💵 الدفع عند الاستلام • 🚚 توصيل سريع</p>
            </div>
          </div>
          <div className="reveal order-1 md:order-2">
            <div className="relative mx-auto max-w-xs md:max-w-sm">
              <div className="absolute inset-0 -z-10 rounded-full bg-gold-soft/60 blur-3xl" />
              <img
                src={bottle.url}
                alt="سبراي OLIVARA زيت طبيعي لتقوية الشعر 50 مل"
                width={1024}
                height={1536}
                className="w-full rounded-3xl object-cover shadow-lift"
              />
            </div>
          </div>
        </div>
      </header>

      {/* OFFER TIMER */}
      <section className="border-y border-border bg-background py-6">
        <div className="reveal mx-auto flex max-w-3xl flex-col items-center gap-3 px-4">
          <p className="text-sm font-bold text-foreground">العرض ينتهي خلال</p>
          <Countdown />
          <div className="w-full max-w-sm">
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[82%] rounded-full bg-gold-gradient transition-all" />
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              بقي عدد محدود من العروض اليوم.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-14">
        <div className="mx-auto max-w-5xl px-4">
          <SectionTitle kicker="الأسعار" title="اختر العرض المناسب ليك" />
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="reveal rounded-3xl border border-border bg-card p-7 text-center shadow-soft transition-transform hover:-translate-y-1">
              <h3 className="text-lg font-extrabold text-foreground">عبوة واحدة</h3>
              <p className="mt-4 text-4xl font-black text-primary">79 DH</p>
              <p className="mt-3 text-sm text-muted-foreground">مثالية للتجربة</p>
              <a
                href="#order"
                className="mt-6 block rounded-2xl border-2 border-primary py-3 font-extrabold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                اطلب الآن
              </a>
            </div>

            <div className="reveal relative rounded-3xl border-2 border-accent bg-cream p-7 text-center shadow-lift transition-transform hover:-translate-y-1">
              <span className="absolute -top-3 right-1/2 translate-x-1/2 rounded-full bg-gold-gradient px-4 py-1 text-xs font-extrabold text-accent-foreground">
                🔥 الأكثر طلباً
              </span>
              <h3 className="mt-2 text-lg font-extrabold text-foreground">عبوتان</h3>
              <div className="mt-4 flex items-center justify-center gap-3">
                <p className="text-4xl font-black text-primary">129 DH</p>
                <span className="text-lg text-muted-foreground line-through">158 DH</span>
              </div>
              <span className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                وفر 29 DH
              </span>
              <a
                href="#order"
                className="mt-6 block rounded-2xl bg-olive-gradient py-3 font-extrabold text-primary-foreground shadow-soft"
              >
                اطلب الآن
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-cream py-14">
        <div className="mx-auto max-w-5xl px-4">
          <SectionTitle kicker="الفوائد" title="علاش OLIVARA؟" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.text}
                className="reveal flex items-start gap-3 rounded-2xl bg-card p-5 shadow-soft transition-transform hover:-translate-y-1"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-xl">
                  {b.icon}
                </span>
                <p className="min-w-0 pt-1.5 text-sm font-bold text-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4">
          <SectionTitle kicker="طريقة الاستعمال" title="3 خطوات بسيطة" />
          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="reveal rounded-3xl border border-border bg-card p-6 text-center shadow-soft"
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-olive-gradient text-3xl">
                  {s.icon}
                </div>
                <p className="mt-4 text-sm font-black text-accent">الخطوة {s.n}</p>
                <p className="mt-1 text-sm font-bold text-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INGREDIENTS */}
      <section className="bg-cream py-14">
        <div className="mx-auto max-w-5xl px-4">
          <SectionTitle kicker="المكونات" title="تركيبة غنية بالزيوت النباتية" />
          <div className="reveal mb-8 overflow-hidden rounded-3xl shadow-lift">
            <img
              src={flatlay.url}
              alt="مكونات OLIVARA الطبيعية: زيت الزيتون والأرغان"
              width={683}
              height={1024}
              loading="lazy"
              className="h-56 w-full object-cover object-center sm:h-72"
            />
          </div>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
            {ingredients.map((i) => (
              <div
                key={i.name}
                className="reveal rounded-2xl border border-gold-soft bg-card p-5 text-center shadow-soft transition-transform hover:-translate-y-1"
              >
                <div className="text-3xl">{i.icon}</div>
                <p className="mt-2 text-sm font-extrabold text-foreground">{i.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4">
          <SectionTitle kicker="آراء الزبناء" title="شنو كيقولو علينا" />
          <div className="grid gap-5 sm:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.a}
                className="reveal rounded-3xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="text-lg text-accent">⭐⭐⭐⭐⭐</div>
                <blockquote className="mt-3 text-sm font-bold leading-relaxed text-foreground">
                  “{t.q}”
                </blockquote>
                <figcaption className="mt-3 text-xs text-muted-foreground">— {t.a}</figcaption>
              </figure>
            ))}
          </div>
          <p className="reveal mt-6 text-center text-xs text-muted-foreground">
            قد تختلف النتائج من شخص لآخر.
          </p>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-olive-gradient py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 lg:grid-cols-4">
          {trust.map((t) => (
            <div
              key={t.t}
              className="reveal rounded-2xl bg-background/10 p-4 text-center backdrop-blur"
            >
              <div className="text-2xl">{t.icon}</div>
              <p className="mt-2 text-sm font-bold text-primary-foreground">{t.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4">
          <SectionTitle kicker="الأسئلة الشائعة" title="واش عندك شي سؤال؟" />
          <div className="space-y-3">
            {faq.map((f) => (
              <details
                key={f.q}
                className="reveal group rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-extrabold text-foreground">
                  {f.q}
                  <span className="text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER */}
      <section id="order" className="scroll-mt-20 bg-cream py-14">
        <div className="mx-auto max-w-md px-4">
          <SectionTitle kicker="الطلب" title="عمّر المعلومات ديالك" />
          <div className="reveal rounded-3xl border border-border bg-card p-6 shadow-lift">
            <OrderForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary-deep pb-28 pt-10 text-center md:pb-10">
        <p className="text-xl font-black tracking-widest text-primary-foreground">OLIVARA</p>
        <p className="mt-1 text-xs tracking-[0.3em] text-primary-foreground/70">HAIR CARE</p>
        <nav className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 px-4 text-sm text-primary-foreground/80">
          <a href="#order" className="hover:text-accent">
            سياسة الخصوصية
          </a>
          <a href="#order" className="hover:text-accent">
            شروط الاستخدام
          </a>
          <a href="tel:+212600000000" className="hover:text-accent">
            اتصل بنا
          </a>
        </nav>
        <p className="mx-auto mt-6 max-w-md px-4 text-[11px] leading-relaxed text-primary-foreground/60">
          منتج للعناية بالشعر. لا يُستعمل كعلاج طبي. قد تختلف النتائج من شخص لآخر مع الاستعمال
          المنتظم.
        </p>
      </footer>
    </div>
  );
}
