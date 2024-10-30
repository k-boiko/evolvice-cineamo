import { NextResponse } from 'next/server';
import { fetchCinemas } from '../../../lib/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const moviesResponse = await fetchCinemas(searchParams.get('page'));

  return NextResponse.json(moviesResponse);
}
