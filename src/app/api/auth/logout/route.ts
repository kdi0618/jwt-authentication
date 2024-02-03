import { DELETE_COOKIE_AGES, JWT_COOKIE_KEY } from "@/lib/constants";
import { serialize } from "cookie";

export async function POST() {
  const serializedToken = serialize(JWT_COOKIE_KEY, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: DELETE_COOKIE_AGES,
  });

  const response = {
    message: 'Logout successful',
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Set-Cookie': serializedToken,
      'Content-Type': 'application/json',
    },
  });
}
