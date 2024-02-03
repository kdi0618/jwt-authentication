'use client';

import { LOGOUT_FLAG_NAME_IN_SESSION } from '@/lib/constants';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    const loggedOutFlag = sessionStorage.getItem(LOGOUT_FLAG_NAME_IN_SESSION);
    if (loggedOutFlag) {
      alert("Logout successful!");
      sessionStorage.removeItem(LOGOUT_FLAG_NAME_IN_SESSION);
    }
  }, []);

  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    };

    try {
      const response = await axios.post('/api/auth/login', payload);
      alert(response.data.message);
      // redirect to /dashboard
      push('/dashboard');
    } catch (error) {
      const errorObj = error as AxiosError;
      alert(errorObj.message);
    }
  };

  return (
    <main>
      <h1>NextJS authentication JWT verify http cookie only</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-2">
          <label htmlFor="text">UserName:　</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            required
            className="border-black border rounded-md py-1"
          />
        </div>
        <div className="flex mb-2">
          <label htmlFor="password">Password:　</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="border-black border rounded-md py-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
        >Login</button>
      </form>
    </main>
  );
}
