import { JWT_COOKIE_KEY } from '@/lib/constants';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();

  const token = cookieStore.get(JWT_COOKIE_KEY);
  if (!token) {
    return NextResponse.json(
      {
        message: 'Invalid username or password',
      },
      {
        status: 401,
      }
    );
  }

  try {
    verify(token.value, process.env.JWT_SECRET || '');

    const response = {
      message: 'Login successful',
    };
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Unauthorized access',
      },
      {
        status: 401,
      }
    );
  }
}
