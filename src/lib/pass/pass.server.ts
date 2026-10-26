import { createHmac, timingSafeEqual } from "node:crypto";
import { getCookie, getRequest, setCookie } from "@tanstack/react-start/server";

const COOKIE = "veil_pass";
const YEARISH = 60 * 60 * 24 * 400;

function secret() {
  return process.env.STRIPE_SECRET_KEY?.trim() || "";
}

export function stripeConfigured() {
  return secret().startsWith("sk_");
}

function seal(email: string) {
  const exp = Math.floor(Date.now() / 1000) + YEARISH;
  const payload = Buffer.from(JSON.stringify({ email, exp })).toString("base64url");
  const sig = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

function cookieOpen(raw: string | undefined) {
  if (!raw || !stripeConfigured()) return false;
  const [payload, sig] = raw.split(".");
  if (!payload || !sig) return false;
  const expected = createHmac("sha256", secret()).update(payload).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as { exp?: number };
    return typeof data.exp === "number" && data.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

export function readPass() {
  const configured = stripeConfigured();
  if (!configured) return { open: true, configured: false };
  return { open: cookieOpen(getCookie(COOKIE)), configured: true };
}

function remember(email: string) {
  const request = getRequest();
  const secure = request ? new URL(request.url).protocol === "https:" : true;
  setCookie(COOKIE, seal(email), {
    path: "/",
    httpOnly: true,
    secure,
    sameSite: "lax",
    maxAge: YEARISH,
  });
}

async function stripeForm(path: string, body: string) {
  const response = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const json = (await response.json()) as { error?: { message?: string } };
  if (!response.ok) {
    throw new Error(json.error?.message || "Stripe refused the request.");
  }
  return json;
}

async function stripeGet(path: string) {
  const response = await fetch(`https://api.stripe.com/v1/${path}`, {
    headers: { Authorization: `Bearer ${secret()}` },
  });
  const json = (await response.json()) as { error?: { message?: string } };
  if (!response.ok) {
    throw new Error(json.error?.message || "Stripe refused the request.");
  }
  return json;
}

export async function startCheckout() {
  if (!stripeConfigured()) {
    return { url: null as string | null, error: "Stripe is not connected yet." };
  }
  const request = getRequest();
  const origin = request ? new URL(request.url).origin : "";
  if (!origin) return { url: null, error: "The chamber could not find its own address." };

  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("customer_creation", "always");
  params.set("cancel_url", `${origin}/pass?canceled=1`);
  params.set("line_items[0][quantity]", "1");
  const price = process.env.STRIPE_PRICE_ID?.trim();
  if (price) {
    params.set("line_items[0][price]", price);
  } else {
    params.set("line_items[0][price_data][currency]", "usd");
    params.set("line_items[0][price_data][unit_amount]", "999");
    params.set("line_items[0][price_data][product_data][name]", "The Tellers Chambers");
  }
  const body = `${params.toString()}&success_url=${origin}/pass?session_id={CHECKOUT_SESSION_ID}`;
  const session = (await stripeForm("checkout/sessions", body)) as { url?: string };
  if (!session.url) return { url: null, error: "Stripe did not open a checkout." };
  return { url: session.url, error: null as string | null };
}

export async function confirmCheckout(sessionId: string) {
  if (!stripeConfigured()) return { open: false, error: "Stripe is not connected yet." };
  if (!sessionId.startsWith("cs_")) return { open: false, error: "That receipt is not one of ours." };
  const session = (await stripeGet(`checkout/sessions/${encodeURIComponent(sessionId)}`)) as {
    payment_status?: string;
    customer_details?: { email?: string | null };
    customer_email?: string | null;
  };
  if (session.payment_status !== "paid") {
    return { open: false, error: "The payment is not finished." };
  }
  remember(session.customer_details?.email || session.customer_email || "paid");
  return { open: true, error: null as string | null };
}

export async function restorePass(email: string) {
  if (!stripeConfigured()) return { open: false, error: "Stripe is not connected yet." };
  const trimmed = email.trim().toLowerCase();
  if (!trimmed.includes("@")) return { open: false, error: "Enter the email you paid with." };
  const found = (await stripeGet(`customers?email=${encodeURIComponent(trimmed)}&limit=1`)) as {
    data?: Array<{ id: string }>;
  };
  const customer = found.data?.[0]?.id;
  if (!customer) return { open: false, error: "No payment under that email." };
  const sessions = (await stripeGet(
    `checkout/sessions?customer=${encodeURIComponent(customer)}&limit=10`,
  )) as { data?: Array<{ payment_status?: string; status?: string }> };
  const paid = sessions.data?.some((s) => s.payment_status === "paid" || s.status === "complete");
  if (!paid) return { open: false, error: "That email has no finished payment." };
  remember(trimmed);
  return { open: true, error: null as string | null };
}
