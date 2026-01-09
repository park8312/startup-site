import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import crypto from "crypto";

const COOKIE_NAME = "nd_admin";

function sign(value: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

function isAuthed(req: NextRequest) {
  const secret = process.env.ADMIN_COOKIE_SECRET;
  if (!secret) return false;

  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const payload = `${parts[0]}.${parts[1]}`;
  const sig = parts[2];
  if (sign(payload, secret) !== sig) return false;

  const ts = Number(parts[1]);
  if (!Number.isFinite(ts)) return false;

  const ONE_WEEK = 60 * 60 * 24 * 7 * 1000;
  if (Date.now() - ts > ONE_WEEK) return false;

  return true;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 로그인 페이지 / 로그인 API는 통과
  if (pathname.startsWith("/admin/login")) return NextResponse.next();
  if (pathname.startsWith("/api/admin/login")) return NextResponse.next();

  // /admin 보호
  if (pathname.startsWith("/admin")) {
    if (!isAuthed(req)) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
