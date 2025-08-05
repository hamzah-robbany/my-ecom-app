// app/api/register/route.ts

import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const registerSchema = z.object({
  email: z.string().email({ message: 'Format email tidak valid' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter' }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email sudah terdaftar' },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'USER', // Default role
      },
    });

    return NextResponse.json(
      { message: 'Registrasi berhasil' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: 'Data tidak valid',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('Register error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
