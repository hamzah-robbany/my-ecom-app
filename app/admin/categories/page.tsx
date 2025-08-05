// app/admin/categories/page.tsx

'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Category } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CategoryForm from '@/components/admin/category-form';
import CategoryTable from '@/components/admin/category-table'; // Import komponen tabel

export default function AdminCategoriesPage() {
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('/api/admin/categories');
      if (!res.ok) throw new Error('Gagal mengambil kategori');
      return res.json();
    },
  });

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setOpen(true);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEditingCategory(null);
    }
  };

  if (isLoading) return <div>Memuat...</div>;
  if (error) return <div>Terjadi kesalahan: {error.message}</div>;
  if (!categories) return <div>Tidak ada kategori ditemukan.</div>;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manajemen Kategori</CardTitle>
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button>Tambah Kategori</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCategory ? 'Edit Kategori' : 'Tambah Kategori'}</DialogTitle>
              <DialogDescription>
                {editingCategory ? 'Perbarui nama kategori.' : 'Tambahkan kategori baru ke sistem.'}
              </DialogDescription>
            </DialogHeader>
            <CategoryForm category={editingCategory} onSave={() => handleOpenChange(false)} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <CategoryTable categories={categories} onEdit={handleEdit} /> {/* Gunakan komponen tabel di sini */}
      </CardContent>
    </Card>
  );
}