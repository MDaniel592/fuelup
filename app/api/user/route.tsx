import { createClient } from '@vercel/kv';
import { NextResponse } from 'next/server';
 
const client = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) return NextResponse.json({ error: 'userId is required' }, { status: 400 });

  const userData = await client.get(userId);
  if (!userData) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ userData: userData });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, userData } = body;
  const response = await client.set(userId, userData);
  return NextResponse.json({ response });
}