import { fetchCinemas, Cinema, Response } from '../../lib/api';
import CinemasList from './CinemasList';

const CinemasPage = async () => {
  const initialResponse: Response<Cinema> = await fetchCinemas();

  return (
    <div className="p-6">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-blue-600 mb-6">
      Find Your Cinema
    </h1>
    <CinemasList initialResponse={initialResponse} />
  </div>

  );
};

export default CinemasPage;
