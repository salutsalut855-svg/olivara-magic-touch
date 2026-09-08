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
fbq('track', 'PageView');
`;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
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

export function readCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function fbqTrack(event: string, params?: Record<string, unknown>, extra?: Record<string, unknown>) {
  if (typeof window.fbq !== "function") return;
  if (extra) window.fbq("track", event, params, extra);
  else window.fbq("track", event, params);
}

function once(storage: Storage, key: string, fn: () => void) {
  try {
    if (storage.getItem(key)) return;
    storage.setItem(key, "1");
  } catch {
    fn();
    return;
  }
  fn();
}

/** First visit ever + saw the landing offer this session. */
export function trackLandingView() {
  once(sessionStorage, "meta-viewcontent", () => {
    fbqTrack("ViewContent", PRODUCT);
  });
  once(localStorage, "meta-first-visit", () => {
    if (typeof window.fbq !== "function") return;
    window.fbq("trackCustom", "FirstVisit", PRODUCT);
  });
}

/** Scrolled to / saw the order form. */
export function trackViewOrderForm() {
  once(sessionStorage, "meta-view-order", () => {
    if (typeof window.fbq !== "function") return;
    window.fbq("trackCustom", "ViewOrderForm", PRODUCT);
  });
}

/** Started typing in the form. */
export function trackInitiateCheckout(offer: "pack" | "duo" = "pack") {
  once(sessionStorage, "meta-initiate-checkout", () => {
    fbqTrack("InitiateCheckout", {
      ...PRODUCT,
      value: offerValue(offer),
      content_ids: [offer],
    });
  });
}

/** Clicked submit with a valid form (before server response). */
export function trackLead(offer: "pack" | "duo") {
  once(sessionStorage, "meta-lead", () => {
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
