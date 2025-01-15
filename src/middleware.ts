import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const {pathname} = request.nextUrl

    if (token && ['/login', '/register'].includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!token && !['/login', '/register'].includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
}