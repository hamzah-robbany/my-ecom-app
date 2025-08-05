// app/(auth)/login/page.tsx

import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </main>
  );
}
