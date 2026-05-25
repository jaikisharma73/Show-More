import React from 'react';
import BlurCircle from '../components/BlurCircle';
const Theaters = () => {
  const dummyTheaters = [
    { id: 1, name: "PVR Cinemas", location: "City Center Mall", screens: 5, format: "IMAX, 3D, 2D" },
    { id: 2, name: "INOX Movies", location: "Forum Mall", screens: 4, format: "4DX, 3D, 2D" },
    { id: 3, name: "Cinepolis", location: "Royal Meenakshi Mall", screens: 6, format: "VIP, 3D, 2D" },
    { id: 4, name: "Carnival Cinemas", location: "Rockline Mall", screens: 3, format: "2D, 3D" },
    { id: 5, name: "Gopalan Cinemas", location: "Innovation Mall", screens: 4, format: "2D, 3D" },
  ];
  return (
    <div className='relative my-30 mb-60 px-6 md:px-16 lg:px-16 xl:px-18 overflow-hidden min-h-[80vh] pt-0'>
      <BlurCircle top="50px" left="0px" />
      <BlurCircle bottom="20px" right="10px" />
      <h1 className='text-3xl font-bold my-8 text-center text-white'>Our Partner Theaters</h1>
      <div className='flex flex-col items-center gap-6 w-full max-w-4xl mx-auto'>
        {dummyTheaters.map((theater) => (
          <div key={theater.id} className='w-full bg-gray-800/60 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 hover:bg-gray-800 transition duration-300'>
            <div className='flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-4'>
              <div>
                <h2 className='text-2xl font-semibold text-white'>{theater.name}</h2>
                <p className='text-gray-400 mt-1'>{theater.location}</p>
                <div className='flex gap-4 mt-3'>
                  <span className='px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300'>{theater.screens} Screens</span>
                  <span className='px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300'>{theater.format}</span>
                </div>
              </div>
              <button className='px-6 py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium text-white shadow-lg'>
                View Shows
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Theaters;
