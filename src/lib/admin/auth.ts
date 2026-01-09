import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "nd_admin";
const ONE_WEEK = 60 * 60 * 24 * 7;

function getSecret() {
  const s = process.env.ADMIN_COOKIE_SECRET;
  if (!s) throw new Error("Missing env: ADMIN_COOKIE_SECRET");
  return s;
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function setAdminCookie() {
  const now = Date.now();
  const payload = `v1.${now}`;
  const sig = sign(payload);
  const token = `${payload}.${sig}`;

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_WEEK,
    path: "/",
  });
}

export function clearAdminCookie() {
  cookies().set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
}

export function isAdminAuthed(): boolean {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const payload = `${parts[0]}.${parts[1]}`; // v1.timestamp
  const sig = parts[2];

  // sig check
  if (sign(payload) !== sig) return false;

  const ts = Number(parts[1]);
  if (!Number.isFinite(ts)) return false;

  // 7일 만료
  if (Date.now() - ts > ONE_WEEK * 1000) return false;

  return true;
}
