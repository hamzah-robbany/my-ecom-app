// app/admin/layout.tsx

import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login?error=Unauthorized');
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Admin akan dibuat di sini */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        {/* Navigasi Admin */}
        <nav className="mt-8">
          <ul>
            <li>
              <a href="/admin/categories" className="block p-2 hover:bg-gray-800 rounded">
                Kategori
              </a>
            </li>
            <li>
              <a href="/admin/products" className="block p-2 hover:bg-gray-800 rounded">
                Produk
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
}