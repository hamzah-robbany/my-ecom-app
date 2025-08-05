// app/api/admin/categories/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import type { ErrorResponse } from '@/types/api'; // Pastikan path ini benar

const prisma = new PrismaClient();

const categorySchema = z.object({
  name: z.string().min(1, { message: 'Nama kategori wajib diisi.' }),
});

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data kategori.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = categorySchema.parse(body);

    const existingCategory = await prisma.category.findUnique({ where: { name } });
    if (existingCategory) {
      return NextResponse.json({ message: 'Nama kategori sudah ada.' }, { status: 409 });
    }

    const newCategory = await prisma.category.create({
      data: { name },
    });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Perbaikan di sini: gunakan tipe ErrorResponse
      const errorResponse: ErrorResponse = {
        message: 'Data tidak valid.',
        errors: error.errors,
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }
    return NextResponse.json({ message: 'Terjadi kesalahan server.' }, { status: 500 });
  }
}