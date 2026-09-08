export const META_PIXEL_ID = "1568274981450158";

export const META_PIXEL_SNIPPET = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
`;

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string };
    _fbq?: unknown;
  }
}

const PRODUCT = {
  content_name: "OLIVARA 3 in 1",
  content_ids: ["pack"],
  content_type: "product",
  value: 189,
  currency: "MAD",
};

export function offerValue(offer: "pack" | "duo") {
  return offer === "duo" ? 229 : 189;
}

export function newEventId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

export function readCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function browserMetaContext() {
  return {
    eventSourceUrl: window.location.href,
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc"),
  };
}

export function ensureMetaPixel() {
  if (typeof window === "undefined") return;

  if (typeof window.fbq !== "function") {
    type FbqFn = ((...args: unknown[]) => void) & {
      queue: unknown[];
      loaded: boolean;
      version: string;
    };
    const n = function (...args: unknown[]) {
      n.queue.push(args);
    } as FbqFn;
    n.queue = [];
    n.loaded = true;
    n.version = "2.0";
    window.fbq = n;
    window._fbq = n;
  }

  if (!document.querySelector('script[src*="fbevents.js"]')) {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  window.fbq?.("init", META_PIXEL_ID);
}

function fbqTrack(event: string, params?: Record<string, unknown>, extra?: Record<string, unknown>) {
  if (typeof window.fbq !== "function") return;
  if (extra) window.fbq("track", event, params, extra);
  else window.fbq("track", event, params);
}

const fired = new Set<string>();

function once(key: string, fn: () => void, storage?: Storage) {
  if (storage) {
    try {
      if (storage.getItem(key)) return false;
      storage.setItem(key, "1");
    } catch {
      /* continue */
    }
  } else if (fired.has(key)) {
    return false;
  } else {
    fired.add(key);
  }
  fn();
  return true;
}

export function trackPageView(eventId: string) {
  fbqTrack("PageView", undefined, { eventID: eventId });
}

export function trackLandingView() {
  const firedView = once("meta-viewcontent", () => {
    fbqTrack("ViewContent", PRODUCT);
  });
  const firedFirst = once(
    "meta-first-visit",
    () => {
      if (typeof window.fbq !== "function") return;
      window.fbq("trackCustom", "FirstVisit", PRODUCT);
    },
    localStorage,
  );
  return { firedView, firedFirst };
}

export function trackViewOrderForm() {
  return once("meta-view-order", () => {
    if (typeof window.fbq !== "function") return;
    window.fbq("trackCustom", "ViewOrderForm", PRODUCT);
  });
}

export function trackInitiateCheckout(offer: "pack" | "duo" = "pack") {
  return once("meta-initiate-checkout", () => {
    fbqTrack("InitiateCheckout", {
      ...PRODUCT,
      value: offerValue(offer),
      content_ids: [offer],
    });
  });
}

export function trackLead(offer: "pack" | "duo") {
  return once("meta-lead", () => {
    fbqTrack("Lead", {
      ...PRODUCT,
      value: offerValue(offer),
      content_ids: [offer],
    });
  });
}

export function trackPurchasePixel(eventId: string, value: number) {
  if (typeof window.fbq !== "function") return;
  window.fbq("track", "Purchase", { value, currency: "MAD" }, { eventID: eventId });
}
