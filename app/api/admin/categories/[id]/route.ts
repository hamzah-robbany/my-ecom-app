// app/api/admin/categories/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import type { ErrorResponse } from '@/types/api';

const prisma = new PrismaClient();

const categorySchema = z.object({
  name: z.string().min(1, { message: 'Nama kategori wajib diisi.' }),
});

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
    });

    if (!category) {
      return NextResponse.json({ message: 'Kategori tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data kategori.' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { name } = categorySchema.parse(body);

    const existingCategory = await prisma.category.findUnique({ where: { name } });
    if (existingCategory && existingCategory.id !== params.id) {
      return NextResponse.json({ message: 'Nama kategori sudah ada.' }, { status: 409 });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: params.id },
      data: { name },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorResponse: ErrorResponse = {
        message: 'Data tidak valid.',
        errors: error.errors,
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }
    // Tangani error jika ID tidak valid atau kategori tidak ditemukan
    return NextResponse.json({ message: 'Gagal memperbarui kategori.' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    // Perbaikan utama: Menggunakan params.id secara langsung
    await prisma.category.delete({
      where: { id: params.id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    // Tangani error jika ID tidak valid atau kategori tidak ditemukan
    return NextResponse.json({ message: 'Gagal menghapus kategori.' }, { status: 500 });
  }
}