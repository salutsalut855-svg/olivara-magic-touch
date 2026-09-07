import { createFileRoute } from "@tanstack/react-router";
import pack from "@/assets/olivara-pack.jpg.asset.json";
import powder from "@/assets/olivara-powder.jpg.asset.json";
import grid from "@/assets/olivara-grid.jpg.asset.json";
import bottle from "@/assets/olivara-bottle.png.asset.json";
import { Countdown } from "@/components/olivara/Countdown";
import { StickyBars } from "@/components/olivara/StickyBars";
import { FloatingActions } from "@/components/olivara/FloatingActions";
import { ExitPopup } from "@/components/olivara/ExitPopup";
import { DesktopBlock } from "@/components/olivara/DesktopBlock";
import { OrderForm } from "@/components/olivara/OrderForm";
import { useReveal } from "@/components/olivara/useReveal";

const TITLE = "OLIVARA Hair Care Pack — باقة 3 في 1 بـ 189 DH";
const DESC =
  "باقة OLIVARA الطبيعية 3 في 1: سبراي الأعشاب + بودرة الأعشاب المركزة + فرشاة تدليك الفروة. 189 DH مع توصيل مجاني والدفع عند الاستلام.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const products = [
  {
    img: bottle.url,
    name: "بخاخ OLIVARA المغذي",
    en: "Hair Mist Spray",
    d: "تركيبة غنية بخلاصات الزيوت والأعشاب الطبيعية لترطيب وتقوية خصلات الشعر يومياً.",
  },
  {
    img: powder.url,
    name: "بودرة الأعشاب النباتية المركزة",
    en: "Botanical Herbal Powder",
    d: "خلطة نباتية طبيعية لتغذية فروة الرأس وتحفيز بصيلات الشعر بعمق.",
  },
  {
    img: grid.url,
    name: "فرشاة تدليك الفروة السيليكونية",
    en: "Scalp Massager",
    d: "سيليكون طبي ناعم لتحفيز الدورة الدموية ومساعدة الفروة على امتصاص المكونات بفعالية.",
  },
];

const benefits = [
  { icon: "💆", text: "يساعد على تحفيز الدورة الدموية في فروة الرأس" },
  { icon: "🌿", text: "يساهم في تقليل مظهر تساقط الشعر وتقوية الجذور" },
  { icon: "✨", text: "يمنح الشعر مظهراً أكثر كثافة ولمعاناً طبيعياً" },
  { icon: "💧", text: "ينظف ويرطب الفروة بعمق دون إتلافها" },
  { icon: "⏱️", text: "روتين منزلي سهل وسريع لجميع أفراد العائلة" },
  { icon: "👩‍🦰", text: "مناسب 100% للنساء والرجال" },
];

const steps = [
  {
    n: "1",
    icon: "🌿",
    t: "التغذية والتحضير",
    d: "خلط بودرة الأعشاب واستعمالها كقناع مغذي للفروة أو رش سبراي OLIVARA مباشرة على الجذور.",
  },
  {
    n: "2",
    icon: "💆",
    t: "التدليك والتحفيز",
    d: "دلّك الفروة بحركات دائرية بفرشاة السيليكون لمدة 2 إلى 3 دقائق لتحفيز الامتصاص.",
  },
  {
    n: "3",
    icon: "📅",
    t: "الاستمرار",
    d: "اعتمد هذا الروتين بانتظام لملاحظة مظهر شعر أقوى وأكثر صحة.",
  },
];

const ingredients = [
  { name: "زيت الزيتون البكر", icon: "🫒" },
  { name: "زيت إكليل الجبل", icon: "🌱" },
  { name: "مستخلصات عشبية نقية", icon: "🍃" },
  { name: "البيوتين وفيتامين E", icon: "💊" },
  { name: "زيت الأرغان الطبيعي", icon: "🌰" },
];

const testimonials = [
  {
    q: "باقة متكاملة، المشط كيحمق والسبراي ريحتو غزالة وطبيعية. لاحظت الفرق فالفروة ديالي من الأسابيع الأولى.",
    a: "سارة، مراكش",
  },
  {
    q: "الباك وصلني فـ24 ساعة والتوصيل كان فابور. الجودة ممتازة والبودرة مع المساج كتعطي إحساس نقي للفروة.",
    a: "ياسين، الدار البيضاء",
  },
  { q: "أحسن روتين جربتو، طريقة الاستعمال ساهلة بزاف وما كياخدش الوقت.", a: "كوثر، الرباط" },
];

const trust = [
  { icon: "🚚", t: "توصيل مجاني وسريع", d: "لكافة مدن وقرى المغرب" },
  { icon: "💵", t: "الدفع نقداً عند الاستلام", d: "حتى توصلك الأمانة" },
  { icon: "📦", t: "تغليف فاخر وآمن", d: "يحمي منتجاتك" },
  { icon: "🌿", t: "مكونات طبيعية", d: "مختارة بعناية" },
];

const certificates = [
  { icon: "✅", title: "تركيبة مرخصة ومطابقة للمعايير الصحية" },
  { icon: "🏭", title: "مصنع وفق معايير الجودة العالمية ISO 22716" },
  { icon: "🫒", title: "زيوت طبيعية معصورة على البارد 100%" },
  { icon: "🧪", title: "تم اختباره مخبرياً لضمان الفعالية والسلامة" },
];

const faq = [
  {
    q: "واش الباقة مناسبة للرجال والنساء؟",
    a: "نعم، مصممة لكلا الجنسين ولكافة أنواع الشعر.",
  },
  {
    q: "شنو كتحتوي الباقة بالضبط؟",
    a: "كتحتوي على: عبوة سبراي OLIVARA، كيس بودرة الأعشاب المركزة، وفرشاة تدليك فروة الرأس السيليكونية.",
  },
  { q: "واش التوصيل فابور؟", a: "نعم، التوصيل بالمجان 100% لجميع أنحاء المغرب." },
  {
    q: "كيفاش كنخلص؟",
    a: "الدفع عند الاستلام كيوصلك الليفرور حتى للدار وتأكد من طلبيتك عاد كتخلص.",
  },
  {
    q: "شحال كتاخد النتيجة باش تبان؟",
    a: "تختلف النتائج من شخص لآخر حسب طبيعة الشعر ومداومة الاستعمال اليومي.",
  },
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
    <div ref={root} className="overflow-x-hidden bg-background pb-24 md:pb-0">
      <DesktopBlock />
      <StickyBars />
      <FloatingActions />
      <ExitPopup />

      {/* ANNOUNCEMENT BAR */}
      <div className="overflow-hidden bg-olive-gradient py-2">
        <p className="animate-[marquee_18s_linear_infinite] whitespace-nowrap text-center text-sm font-bold text-primary-foreground">
          🚚 التوصيل بالمجان لجميع مدن المغرب + الدفع عند الاستلام 💵
        </p>
      </div>

      {/* HERO */}
      <header className="relative bg-cream pb-14 pt-8">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 md:grid-cols-2 md:items-center">
          <div className="reveal order-2 text-center md:order-1 md:text-right">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold-soft bg-background px-4 py-1.5 text-xs font-bold text-accent-foreground">
              🫒 OLIVARA — PREMIUM BOTANICAL CARE
            </p>
            <h1 className="mt-4 text-3xl font-black leading-tight text-foreground sm:text-4xl md:text-[2.75rem]">
              رجع القوة والكثافة لشعرك مع باقة{" "}
              <span className="text-primary">OLIVARA الطبيعية المتكاملة</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              روتين طبيعي 3 في 1 (سبراي الأعشاب + بودرة الأعشاب المركزة + فرشاة التدليك) مصمم
              للعناية بالفروة وتغذية الشعر من الجذور مع الاستعمال المنتظم.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <span dir="ltr" className="text-4xl font-black text-primary">
                189 DH
              </span>
              <span dir="ltr" className="text-lg text-muted-foreground line-through">
                279 DH
              </span>
              <span className="rounded-full bg-gold-gradient px-3 py-1 text-xs font-extrabold text-accent-foreground">
                وفر 90 DH + التوصيل مجاني 🚚
              </span>
            </div>

            <a
              href="#order"
              className="mt-6 inline-block w-full rounded-2xl bg-olive-gradient px-8 py-4 text-center text-lg font-extrabold text-primary-foreground shadow-lift transition-transform hover:scale-[1.02] sm:w-auto"
            >
              اطلب الباقة الآن (189 DH)
            </a>
          </div>

          <div className="reveal order-1 md:order-2">
            <div className="relative mx-auto max-w-xs md:max-w-sm">
              <div className="absolute inset-0 -z-10 rounded-full bg-gold-soft/60 blur-3xl" />
              <img
                src={pack.url}
                alt="باقة OLIVARA 3 في 1: سبراي الأعشاب وبودرة الأعشاب وفرشاة تدليك الفروة"
                width={576}
                height={1024}
                className="w-full rounded-3xl object-cover shadow-lift"
              />
            </div>
          </div>
        </div>
      </header>

      {/* CERTIFICATES */}
      <section className="bg-cream py-10">
        <div className="mx-auto max-w-5xl px-4">
          <div className="reveal mb-6 text-center">
            <p className="text-sm font-bold tracking-widest text-accent">شهادات وجودة</p>
            <h2 className="mt-2 text-xl font-extrabold text-foreground sm:text-2xl">
              منتج موثوق ومضمون
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold-gradient" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certificates.map((c) => (
              <div
                key={c.title}
                className="reveal flex items-center gap-3 rounded-2xl border border-gold-soft bg-card p-4 shadow-soft"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-olive-gradient text-xl text-primary-foreground">
                  {c.icon}
                </span>
                <p className="text-xs font-extrabold leading-relaxed text-foreground">{c.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4">
          <SectionTitle kicker="محتوى الباقة" title="شنو كاين فباقة OLIVARA؟" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <article
                key={p.name}
                className="reveal overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-transform hover:-translate-y-1"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="h-48 w-full object-cover"
                />
                <div className="p-5 text-center">
                  <h3 className="text-base font-extrabold text-foreground">{p.name}</h3>
                  <p className="mt-0.5 text-[11px] tracking-widest text-accent">{p.en}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-cream py-14">
        <div className="mx-auto max-w-5xl px-4">
          <SectionTitle kicker="الفوائد" title="علاش باقة OLIVARA؟" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.text}
                className="reveal flex items-start gap-3 rounded-2xl bg-card p-5 shadow-soft transition-transform hover:-translate-y-1"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-xl">
                  {b.icon}
                </span>
                <p className="min-w-0 pt-1 text-sm font-bold leading-relaxed text-foreground">
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4">
          <SectionTitle kicker="طريقة الاستعمال" title="روتين ديال 3 خطوات" />
          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="reveal rounded-2xl border border-border bg-card p-6 text-center shadow-soft"
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-olive-gradient text-3xl">
                  {s.icon}
                </div>
                <p className="mt-4 text-sm font-black text-accent">الخطوة {s.n}</p>
                <h3 className="mt-1 text-base font-extrabold text-foreground">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INGREDIENTS */}
      <section className="bg-cream py-14">
        <div className="mx-auto max-w-5xl px-4">
          <SectionTitle kicker="المكونات" title="مكونات طبيعية مختارة بعناية" />
          <div className="reveal mb-8 overflow-hidden rounded-2xl shadow-lift">
            <img
              src={grid.url}
              alt="مكونات ومنتجات OLIVARA الطبيعية"
              loading="lazy"
              className="h-56 w-full object-cover object-center sm:h-80"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            {ingredients.map((i) => (
              <div
                key={i.name}
                className="reveal rounded-2xl border border-gold-soft bg-card p-5 text-center shadow-soft transition-transform hover:-translate-y-1"
              >
                <div className="text-3xl">{i.icon}</div>
                <p className="mt-2 text-sm font-extrabold text-foreground">{i.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-14">
        <div className="mx-auto max-w-4xl px-4">
          <SectionTitle kicker="العروض" title="اختار الباقة اللي مناسبة ليك" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="reveal relative rounded-2xl border-2 border-accent bg-cream p-7 text-center shadow-lift">
              <span className="absolute -top-3 right-1/2 translate-x-1/2 whitespace-nowrap rounded-full bg-gold-gradient px-4 py-1 text-xs font-extrabold text-accent-foreground">
                🔥 عرض خاص
              </span>
              <h3 className="mt-3 text-lg font-extrabold text-foreground">الباقة الأساسية 3 في 1</h3>
              <ul className="mt-3 space-y-1.5 text-sm font-bold text-foreground">
                <li>✔ سبراي OLIVARA المغذي</li>
                <li>✔ بودرة الأعشاب المركزة</li>
                <li>✔ فرشاة المساج السيليكونية</li>
              </ul>
              <div className="mt-5 flex items-center justify-center gap-3">
                <p dir="ltr" className="text-4xl font-black text-primary">
                  189 DH
                </p>
                <span dir="ltr" className="text-lg text-muted-foreground line-through">
                  279 DH
                </span>
              </div>
              <p className="mt-2 text-sm font-bold text-primary">🚚 توصيل مجاني لجميع المدن</p>
              <a
                href="#order"
                className="mt-6 block rounded-2xl bg-olive-gradient py-4 text-base font-extrabold text-primary-foreground shadow-soft transition-transform hover:scale-[1.01]"
              >
                اطلب الباقة الأساسية
              </a>
            </div>

            <div className="reveal relative rounded-2xl border-2 border-primary bg-card p-7 text-center shadow-lift">
              <span className="absolute -top-3 right-1/2 translate-x-1/2 whitespace-nowrap rounded-full bg-olive-gradient px-4 py-1 text-xs font-extrabold text-primary-foreground">
                ⭐ الأكثر مبيعاً
              </span>
              <h3 className="mt-3 text-lg font-extrabold text-foreground">باقة العائلة (عبوتين)</h3>
              <ul className="mt-3 space-y-1.5 text-sm font-bold text-foreground">
                <li>✔ 2 سبراي OLIVARA المغذي</li>
                <li>✔ بودرة الأعشاب المركزة</li>
                <li>✔ فرشاة المساج السيليكونية</li>
              </ul>
              <div className="mt-5 flex items-center justify-center gap-3">
                <p dir="ltr" className="text-4xl font-black text-primary">
                  229 DH
                </p>
                <span dir="ltr" className="text-lg text-muted-foreground line-through">
                  378 DH
                </span>
              </div>
              <p className="mt-2 text-sm font-bold text-accent">💰 كتربح أكثر من 140 DH</p>
              <a
                href="#order"
                className="mt-6 block rounded-2xl bg-olive-gradient py-4 text-base font-extrabold text-primary-foreground shadow-soft transition-transform hover:scale-[1.01]"
              >
                اطلب باقة عبوتين
              </a>
            </div>
          </div>

          <div className="reveal mx-auto mt-8 max-w-2xl rounded-2xl border border-gold-soft bg-cream p-6 text-center shadow-soft">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm font-bold text-foreground">العرض ينتهي خلال</p>
              <Countdown />
            </div>
            <div className="mt-6">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[82%] rounded-full bg-gold-gradient" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                بقي 9 باقات فقط بالسعر المخفض لليوم
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* TESTIMONIALS */}
      <section className="bg-cream py-14">
        <div className="mx-auto max-w-5xl px-4">
          <SectionTitle kicker="آراء الزبناء" title="شنو كيقولو علينا" />
          <div className="grid gap-5 sm:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.a}
                className="reveal rounded-2xl border border-border bg-card p-6 shadow-soft"
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
            قد تختلف النتائج حسب طبيعة الشعر والاستعمال المنتظم.
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
              <p className="mt-0.5 text-xs text-primary-foreground/75">{t.d}</p>
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
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER */}
      <section id="order" className="scroll-mt-20 bg-cream py-14">
        <div className="mx-auto max-w-md px-4">
          <SectionTitle
            kicker="الطلب"
            title="أدخل معلوماتك للاستفادة من العرض (189 DH - التوصيل مجاني)"
          />
          <div className="reveal rounded-2xl border border-border bg-card p-6 shadow-lift">
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
          منتجات للعناية بالشعر. لا تُستعمل كعلاج طبي. قد تختلف النتائج حسب طبيعة الشعر والاستعمال
          المنتظم.
        </p>
      </footer>
    </div>
  );
}
