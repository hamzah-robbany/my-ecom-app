// app/api/admin/categories/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import type { ErrorResponse } from '@/types/api';

const prisma = new PrismaClient();

const categorySchema = z.object({
  name: z.string().min(1, { message: 'Nama kategori wajib diisi.' }),
});

// Tipe yang lebih eksplisit untuk parameter kedua
interface RouteContext {
  params: {
    id: string;
  };
}

// Handler GET
export async function GET(req: Request, context: RouteContext) {
  const { id } = context.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json({ message: 'Kategori tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data kategori.' }, { status: 500 });
  }
}

// Handler PUT
export async function PUT(req: Request, context: RouteContext) {
  const { id } = context.params;
  try {
    const body = await req.json();
    const { name } = categorySchema.parse(body);

    const existingCategory = await prisma.category.findUnique({ where: { name } });
    if (existingCategory && existingCategory.id !== id) {
      return NextResponse.json({ message: 'Nama kategori sudah ada.' }, { status: 409 });
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
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
    return NextResponse.json({ message: 'Gagal memperbarui kategori.' }, { status: 500 });
  }
}

// Handler DELETE
export async function DELETE(req: Request, context: RouteContext) {
  const { id } = context.params;
  try {
    await prisma.category.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal menghapus kategori.' }, { status: 500 });
  }
}