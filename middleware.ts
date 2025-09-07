import { NextRequest, NextResponse } from "next/server";
import { verifyKaryawan, verifyPelanggan } from "./helper/authorization";

export const middleware = async (request: NextRequest) => {
  /** ambil data token dari cookie */
  if (request.nextUrl.pathname.startsWith("/karyawan")) {
    const role = request.cookies.get("role")?.value
    /** redirect to login */
    const redirectLogin = request.nextUrl.clone();
    redirectLogin.pathname = "/" // url halaman login

    if (typeof role === "undefined") {
      return NextResponse.redirect(redirectLogin)
    }

    const isVerifiedToken = "ADMIN" === role
    if (!isVerifiedToken) {
      return NextResponse.redirect(redirectLogin)
    }
    return NextResponse.next()
  }

  if (request.nextUrl.pathname.startsWith("/pelanggan")) {
    const role = request.cookies.get("role")?.value
    /** redirect to login */
    const redirectLogin = request.nextUrl.clone();
    redirectLogin.pathname = "/" // url halaman login

    if (typeof role === "undefined") {
      return NextResponse.redirect(redirectLogin)
    }

    const isVerifiedToken = role === 'USER'
    if (!isVerifiedToken) {
      return NextResponse.redirect(redirectLogin)
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

/** menentukan route mana saja yang akan memberlakukan proses middleware */
export const config = {
    matcher: [
        "/karyawan/:path*", "/pelanggan/:path*"
    ]
}