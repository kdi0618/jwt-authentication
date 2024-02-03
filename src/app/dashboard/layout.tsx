'use client';

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserResponse {
  user: string | null;
  error: AxiosError | null;
}

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { user, error } = await getLoginStatus();
      if (error || !user) {
        push('/');
        return;
      }
      setIsSuccess(true);
    })();
  }, []);

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <header>Navigation</header>
      {children}
    </main>
  );
}

async function getLoginStatus(): Promise<UserResponse> {
  try {
    const { data } = await axios.get('/api/auth/login-status');
    return {
      user: data,
      error: null
    }
  } catch (error) {
    const errorObj = error as AxiosError;
    return {
      user: null,
      error: errorObj
    }
  }
}
