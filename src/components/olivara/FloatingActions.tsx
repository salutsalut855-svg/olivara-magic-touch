export function FloatingActions() {
  return (
    <div className="fixed bottom-24 left-4 z-40 flex flex-col gap-3 md:bottom-6">
      <a
        href="https://wa.me/212656688867"
        target="_blank"
        rel="noreferrer"
        aria-label="واتساب +212 656-688867"
        className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
          <path d="M20 3.9A10 10 0 0 0 3.5 15.3L2 22l6.9-1.8A10 10 0 1 0 20 3.9Zm-8 16a8 8 0 0 1-4.1-1.1l-.3-.2-3.6.9.9-3.5-.2-.3A8 8 0 1 1 12 19.9Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.6.1a6.6 6.6 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2a.6.6 0 0 0 0-.6c0-.2-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c2.1.8 2.1.6 2.5.5a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3Z" />
        </svg>
      </a>
      <a
        href="tel:+212656688867"
        aria-label="اتصل بنا على +212 656-688867"
        className="grid h-12 w-12 place-items-center rounded-full bg-gold-gradient text-accent-foreground shadow-lift transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
          <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2a11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .6 3.6c.1.3 0 .7-.2 1l-2.3 2.2Z" />
        </svg>
      </a>
    </div>
  );
}