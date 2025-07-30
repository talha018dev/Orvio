import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    // console.error('Middleware Triggered:', req.nextUrl.pathname)
    // console.error('Cookies:', req.cookies.getAll())
    // console.error('Headers:', Object.fromEntries(req.headers))
    const token = req.cookies.get('accessTokenSkyhaus')?.value

    const url = new URL(req.url);

    if (url.pathname === '/') {
        return NextResponse.redirect(new URL('/board', req.url))
    }

    if (!token && !(req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.includes('success'))) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    // fetch('http://localhost:3000/api/log', {
    //     method: 'POST',
    //     body: JSON.stringify({ path: url.pathname, cookies: req.cookies.get('accessTokenSkyhaus')?.value }),
    //     headers: { 'Content-Type': 'application/json' },
    // }).catch(() => { }); // Catch errors silently

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/profile/:path*', '/board/:path*', '/projects/:path*', '/stages/:path*'], // Apply middleware to protected routes
}