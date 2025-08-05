// middleware.ts

import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const { pathname } = req.nextUrl

      // ❌ Kalau belum login, tolak akses semua rute yang dilindungi
      if (!token) return false

      // ✅ Kalau rute admin, hanya boleh diakses oleh role ADMIN
      if (pathname.startsWith('/admin')) {
        return token.role === 'ADMIN'
      }

      // ✅ Rute dashboard boleh diakses oleh semua user yang login
      if (pathname.startsWith('/dashboard')) {
        return true
      }

      return true
    },
  },
  pages: {
    signIn: '/login',
  },
})

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/dashboard'],
}
