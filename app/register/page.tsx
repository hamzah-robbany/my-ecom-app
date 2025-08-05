// app/register/page.tsx

import RegisterForm from '@/components/forms/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <RegisterForm />
    </main>
  );
}