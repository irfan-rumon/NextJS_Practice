import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
 function middleware(req) {
    const session = req.nextauth.token;
    console.log("session at middleware: ", session);

    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isUserRoute = req.nextUrl.pathname.startsWith("/user");
    const isLoginPage = req.nextUrl.pathname === "/auth/login";

    const isAdminUser = session?.user?.roll === "admin";
    const isUser = session?.user?.roll === "user";

    if ((isAdminRoute && !isAdminUser) || (isUserRoute && !isUser)) {
      if (!isLoginPage) {
        // Construct the redirect URL with an appropriate message
        const redirectUrl = new URL("/auth/login", req.url);
        redirectUrl.searchParams.append("message", "You Are Not Authorized!");
        // Use NextResponse.redirect for redirection
        return NextResponse.redirect(redirectUrl.toString());
      }
    }
 },
 {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
 }
);

export const config = {
 matcher: ["/admin/:path*", "/user/:path*"],
};
