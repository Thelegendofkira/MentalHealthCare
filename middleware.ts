import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;

    // If no token, redirect to login
    if (!token) {
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    try {
        // Verify the token using edge-compatible 'jose'
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        // Role-based routing protection
        if (request.nextUrl.pathname.startsWith('/mentor') && payload.role !== 'mentor') {
            return NextResponse.redirect(new URL('/training', request.url));
        }
        if (request.nextUrl.pathname.startsWith('/training') && payload.role !== 'trainee') {
            return NextResponse.redirect(new URL('/mentor', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        // If token is invalid/expired
        return NextResponse.redirect(new URL('/auth', request.url));
    }
}

// Specify exactly which routes this middleware should protect
export const config = {
    matcher: ['/training/:path*', '/mentor/:path*'],
};