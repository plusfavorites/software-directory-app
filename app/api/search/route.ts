import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity.client';
import { searchAppsQuery } from '@/lib/queries';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  if (!query.trim()) {
    return NextResponse.json({ results: [] });
  }

  const term = `${query}*`;
  const results = await client.fetch(searchAppsQuery, { term });
  return NextResponse.json({ results });
}
