import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "default_super_secret_key_ahmed_portfolio_2026_at_least_32_chars"
);

const COOKIE_NAME = "ahmed_session";

interface SessionPayload {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;

  let session: SessionPayload | null = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET);
      session = payload as unknown as SessionPayload;
    } catch {
      session = null;
    }
  }

  const isAuthenticated = !!session;
  const role = session?.role;

  // 1. If visiting the login page /client while already authenticated
  if (pathname === "/client") {
    if (isAuthenticated) {
      const target = role === "ADMIN" ? "/client/admin" : "/client/portal";
      return NextResponse.redirect(new URL(target, req.url));
    }
    return NextResponse.next();
  }

  // 2. Protect Admin Route (/client/admin)
  if (pathname.startsWith("/client/admin")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/client", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (role !== "ADMIN") {
      // Forbidden: redirect regular client to portal
      return NextResponse.redirect(new URL("/client/portal", req.url));
    }
    return NextResponse.next();
  }

  // 3. Protect Client Portal (/client/portal)
  if (pathname.startsWith("/client/portal")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/client", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/client", "/client/portal/:path*", "/client/admin/:path*"],
};

