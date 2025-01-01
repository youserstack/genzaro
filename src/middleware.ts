import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 토큰추출과 토큰인코딩
  // const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  // JSON.stringify로 직렬화 후 Base64 인코딩 (UTF-8 안전 처리)
  // const encodedToken = token ? Buffer.from(JSON.stringify(token)).toString("base64url") : "";

  // 헤더추가
  // const headers = new Headers(request.headers);
  // headers.set("token", encodedToken); // Base64로 인코딩된 token 설정

  // 응답설정
  // const response = NextResponse.next({ request: { headers } });

  // return response;
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
