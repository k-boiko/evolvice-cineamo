'use client';

import { useState } from 'react';
import { Cinema, Response } from '../../lib/api';
import Image from 'next/image';

interface CinemasListProps {
  initialResponse: Response<Cinema>;
}

const CinemasList: React.FC<CinemasListProps> = ({ initialResponse }) => {
  const [cinemas, setCinemas] = useState<Cinema[]>(initialResponse._embedded.cinemas);
  const [nextPageLink, setNextPageLink] = useState<string | null>(initialResponse._links.next?.href || null);

  const loadMore = async () => {
    if (!nextPageLink) return;

    try {
      const response = await fetch(`/api/cinemas?page=${encodeURIComponent(nextPageLink)}`);
      const data: Response<Cinema> = await response.json();

      setCinemas((prevCinemas) => [...prevCinemas, ...data._embedded.cinemas]);
      setNextPageLink(data._links.next?.href || null);
    } catch (error) {
      console.error('Failed to load more cinemas:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cinemas.map((cinema) => (
          <div
            key={cinema.id}
            className="relative flex flex-col justify-end h-64 bg-cover bg-center rounded-lg overflow-hidden shadow-lg"
            style={{ backgroundImage: `url(${cinema.profileImageUrl})` }}
          >
            <div className="bg-gradient-to-t from-black/70 via-black/20 to-transparent p-2">
              <div className="flex items-center gap-2">
                {cinema.logoImageUrl && (
                  <Image
                    src={cinema.logoImageUrl}
                    alt={`${cinema.name} logo`}
                    width='458'
                    height='256'
                    className="w-10 h-10 object-contain"
                  />
                )}
                <h3 className="text-white font-semibold">{cinema.name}</h3>
              </div>
              <p className="text-gray-200 text-sm">
                {[cinema.street, cinema.city, cinema.stateAbbr, cinema.postalCode, cinema.country].filter(Boolean).join(', ')}
              </p>
            </div>
          </div>
        ))}
      </div>
      {nextPageLink && (
        <button
          onClick={loadMore}
          className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default CinemasList;
