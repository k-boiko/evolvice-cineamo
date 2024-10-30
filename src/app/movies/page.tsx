import { Response, fetchMovies, Movie } from '../../lib/api';
import MoviesList from './MoviesList';

const MoviesPage = async () => {
  const initialResponse: Response<Movie> = await fetchMovies();

  return (
    <div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-blue-600 mb-6">All Movies</h1>
      <MoviesList initialResponse={initialResponse} />
    </div>
  );
};

export default MoviesPage;
