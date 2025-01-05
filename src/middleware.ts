import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("connect.sid");
  if (req.nextUrl.pathname.startsWith("/checkout") && !sessionCookie) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};

//   if (request.nextUrl.pathname.startsWith("/admin") && !token) {
//     return NextResponse.redirect(new URL("/signin", request.url));
//   }

// const headers = new Headers(request.headers);
// headers.set("token", JSON.stringify(token));

// const response = NextResponse.next({
//   request: {
//     // New request headers
//     headers: headers,
//   },
// });

// 헤더추가
// const headers = new Headers(request.headers);
// headers.set("token", encodedToken); // Base64로 인코딩된 token 설정

// 응답설정
// const response = NextResponse.next({ request: { headers } });

// return response;
