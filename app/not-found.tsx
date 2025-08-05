// app/not-found.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react'; // Import ikon

export default function NotFound() {
return (
<main className="flex min-h-screen items-center justify-center p-24">
<Card className="w-full max-w-lg text-center">
<CardHeader className="flex flex-col items-center">
<AlertTriangle className="h-16 w-16 text-gray-800 mb-4" /> {/* Tambahkan ikon di sini */}
<CardTitle className="text-9xl font-bold text-gray-800">404</CardTitle>
<CardDescription className="text-xl mt-4">Halaman Tidak Ditemukan</CardDescription>
</CardHeader>
<CardContent>
<p className="text-gray-600 mb-6">
Maaf, kami tidak dapat menemukan halaman yang Anda cari.
</p>
<Link href="/">
<Button>
<svg
xmlns="http://www.w3.org/2000/svg"
width="20"
height="20"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2"
strokeLinecap="round"
strokeLinejoin="round"
className="mr-2"
>
<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
<polyline points="9 22 9 12 15 12 15 22"></polyline>
</svg>
Kembali ke Beranda
</Button>
</Link>
</CardContent>
</Card>
</main>
);
}