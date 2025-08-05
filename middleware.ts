// middleware.ts

import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Lindungi rute admin
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return token?.role === 'ADMIN';
      }
      // Semua rute lain memerlukan autentikasi
      return !!token;
    },
  },
});

export const config = {
  matcher: ['/admin/:path*', '/dashboard'], // Rute yang akan dilindungi
};