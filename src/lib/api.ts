const API_BASE_URL = 'https://api.cineamo.com';

interface Link {
  href: string;
}

export interface Response<T> {
  _total_items: number;
  _page: number;
  _page_count: number;
  _links: {
    self: Link;
    next: Link;
    last: Link;
  };
  _embedded: T extends Cinema
    ? { cinemas: T[] }
    : T extends Movie
    ? { movies: T[] }
    : { [key: string]: unknown[] };
}

export type Genre = {
  id: number;
  name: string;
}

export type Country = {
  iso31661: string;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  genres: Genre[];
  productionCountries: Country[];
  releaseDate: string;
  status: string;
  tagline: string;
  posterPath: string;
  _links: {
    self: Link;
  };
}

export interface Cinema {
  id: number;
  name: string;
  shortName: string;
  slug: string;
  description: string;
  street: string;
  city: string;
  stateAbbr: string;
  country: string;
  postalCode: string;
  imageUrl: string;
  logoUrl: string | null;
  logoImageUrl: string | null;
  profileImageUrl: string | null;
  _links: {
    self: Link;
  };
}

export async function api<T>(url: string): Promise<Response<T>> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }

  return response.json();
}


// @route - optional param for cases when we have full pagination link
export async function fetchMovies(route: string | null = null) {
  return api<Movie>(route || `${API_BASE_URL}/movies`);
}

// @route - optional param for cases when we have full pagination link
export async function fetchCinemas(route: string | null = null) {
  return api<Cinema>(route || `${API_BASE_URL}/cinemas`);
}
