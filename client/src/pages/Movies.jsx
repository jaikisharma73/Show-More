import React from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import BlurCircle from '../components/BlurCircle';
import { useAppContext } from '../context/appContext';

const Movies = () => {
  const {shows}=useAppContext();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const filteredShows = shows.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return filteredShows.length > 0 ? (
    <div className='relative my-30 mb-60 px-6 md:px-16 lg:px-16 xl:px-18 overflow-hidden min-h-[80vh]'>
      <BlurCircle top="50px" left="0px" />
      <BlurCircle bottom="20px" right="10px" />
      <h1 className='text-lg font-medium my-4'>
        {searchQuery ? `Search Results for "${searchQuery}"` : 'Now Showing.'}
      </h1>
      <div className='grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-4 sm:gap-8'>
        {filteredShows.map((movie)=>(
          <MovieCard movie = {movie} key={movie._id} />
        ))}
      </div>
    </div>
  ):(
    <div className='flex flex-col items-center justify-center h-[70vh]'>
        <h1 className='text-3xl font-bold text-center'>
          {searchQuery ? `No movies found for "${searchQuery}"` : 'No movies available'}
        </h1>
    </div>
  )
}
export default Movies;