import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlurCircle from '../components/BlurCircle';
import { StarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Releases = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const { data } = await axios.get("/api/show/upcoming");
        if (data.success) {
          setUpcomingMovies(data.movies);
        }
      } catch (error) {
        console.error("Fetch upcoming error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingMovies();
  }, []);

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center h-[60vh]'>
        <h1 className='text-2xl font-bold text-center text-white'>Loading upcoming releases...</h1>
      </div>
    );
  }

  return (
    <div className='relative my-30 mb-60 px-6 md:px-16 lg:px-16 xl:px-18 overflow-hidden min-h-[80vh] pt-0'>
      <BlurCircle top="50px" left="0px" />
      <BlurCircle bottom="20px" right="10px" />

      <h1 className='text-3xl font-bold my-8 text-white'>Upcoming Releases</h1>

      <div className='flex flex-wrap max-sm:justify-center gap-8'>
        {upcomingMovies.length > 0 ? upcomingMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => {
              navigate(`/releases/${movie.id}`);
              scrollTo(0, 0);
            }}
            className='cursor-pointer flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:translate-y-1 transition duration-300 w-64'
          >
            {movie.backdrop_path || movie.poster_path ? (
              <img
                src={image_base_url + (movie.backdrop_path || movie.poster_path)}
                alt={movie.title}
                className='rounded-lg h-52 w-full object-cover object-center'
              />
            ) : (
              <div className='rounded-lg h-52 w-full bg-gray-700 flex items-center justify-center text-gray-500'>
                No Image
              </div>
            )}
            <p className='font-semibold mt-2 truncate text-white'>{movie.title}</p>
            <p className='text-sm text-gray-400 mt-2'>
              {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : "TBA"}
            </p>

            <div className='flex items-center justify-between mt-4 pb-3'>
              <button className='px-4 py-2 text-xs bg-gray-600 cursor-not-allowed rounded-full font-medium text-white'>
                Coming Soon
              </button>
              {movie.vote_average > 0 && (
                <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
                  <StarIcon className='w-4 h-4 text-primary fill-primary' />
                  {movie.vote_average.toFixed(1)}
                </p>
              )}
            </div>
          </div>
        )) : (
          <div className='w-full flex items-center justify-center h-40'>
            <p className='text-xl text-gray-400'>No upcoming releases found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Releases;
