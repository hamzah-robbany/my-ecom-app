// next-auth.d.ts

import 'next-auth/jwt';
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role?: 'ADMIN' | 'USER'; // Tambahkan properti role di sini
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role?: 'ADMIN' | 'USER'; // Tambahkan properti role di sini
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'ADMIN' | 'USER'; // Tambahkan properti role di sini
  }
}