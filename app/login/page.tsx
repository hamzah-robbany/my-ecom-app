// app/login/page.tsx

import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <LoginForm />
    </main>
  );
}