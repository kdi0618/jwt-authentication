'use client';
import { LOGOUT_FLAG_NAME_IN_SESSION } from "@/lib/constants";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { push } = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/auth/logout');
      if (response.status !== 200) new Error;
      push('/');
      sessionStorage.setItem(LOGOUT_FLAG_NAME_IN_SESSION, 'true');
      return;
    } catch {
      alert('Failed to logout');
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <input
        type="button"
        value="Logout"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded hover:cursor-pointer"
        onClick={handleLogout}
      />
    </div>
  );
}
