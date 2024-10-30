'use client';

import { useState } from 'react';
import { Movie, Response } from '../../lib/api';
import Image from 'next/image';

interface MoviesListProps {
  initialResponse: Response<Movie>;
}

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/original';

const MoviesList: React.FC<MoviesListProps> = ({ initialResponse }) => {
  const [movies, setMovies] = useState<Movie[]>(initialResponse._embedded.movies);
  const [nextPageLink, setNextPageLink] = useState<string | null>(initialResponse._links.next?.href || null);

  const loadMore = async () => {
    if (!nextPageLink) return;

    try {
      const response = await fetch(`/api/movies?page=${encodeURIComponent(nextPageLink)}`);
      const data = (await response.json()) as Response<Movie>;

      setMovies((prevMovies) => [...prevMovies, ...data._embedded.movies]);
      setNextPageLink(data._links.next?.href || null);
    } catch (error) {
      console.error('Failed to load more movies:', error);
    }
  };

  return (
    <div className="p-4">
    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {movies.map((movie) => {
        const genres = movie.genres?.map((genre) => genre.name).join(', ');
        const countries = movie.productionCountries?.map((country) => country.name).join(', ');
        const image = `${POSTER_BASE_URL}/${movie.posterPath}`;
        return (
          <div
            key={movie.id}
            className="flex flex-col h-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Image src={image} alt={movie.title} className='rounded-lg' width='225' height='337'/>
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-200 mt-2">{movie.title} {movie.releaseDate && <span className="text-sm text-gray-500">({movie.releaseDate.slice(0, 4)})</span>}</h2>
                {movie.tagline && <p className="text-sm italic text-gray-600">&quot;{movie.tagline}&quot;</p>}

                {genres && <p className="text-sm text-gray-400 mt-2">{genres}</p>}
                {countries && <p className="text-sm text-gray-500">{countries}</p>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
    {nextPageLink && (
      <button
        onClick={loadMore}
        className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Load More
      </button>
    )}
  </div>
  );
};

export default MoviesList;
