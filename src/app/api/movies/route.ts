import { NextResponse } from 'next/server';
import { fetchMovies } from '../../../lib/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const moviesResponse = await fetchMovies(searchParams.get('page'));

  return NextResponse.json(moviesResponse);
}
