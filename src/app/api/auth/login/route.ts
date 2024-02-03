import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { JWT_COOKIE_KEY, MAX_AGE } from '@/lib/constants';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  if (username !== 'admin' || password !== 'admin') {
    return NextResponse.json(
      {
        message: 'Invalid username or password',
      },
      {
        status: 401,
      }
    );
  }

  // Always check secret
  const secret = process.env.JWT_SECRET || "";

  const token = jwt.sign(
    { username },
    secret,
    { expiresIn: MAX_AGE }
  );

  const serializedToken = serialize(JWT_COOKIE_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: MAX_AGE,
  });

  const response = {
    message: 'Login successful',
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Set-Cookie': serializedToken,
      'Content-Type': 'application/json',
    },
  });
}
