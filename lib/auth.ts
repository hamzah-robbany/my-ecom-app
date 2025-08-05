// lib/auth.ts

import { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Import dari file yang sudah kita buat

export const getSession = () => getServerSession(authOptions);