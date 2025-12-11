import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function proxy(request: NextRequest) {
  
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' ;
  
  const token = request.cookies.get('token')?.value || '';
  
  if (token) {
    if (path === "/login") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    // signup is allowed even with token
  }

  if(!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  

}

export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
  ]
};
