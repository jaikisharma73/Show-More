import React from 'react'
import { assets } from '../assets/assets';
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const HeroSection = () => {

  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-16 bg-[url("/background.jpg")] bg-cover bg-center h-screen'>
      <img src={assets.marvelLogo} alt="" className='max-h-11 lg:h-11 mt-20' />
      <h1 className='text-5xl md:text-[70px] md:leading-18 text-white font-semibold max-2-110'>Spider-Man <br />Brand New Day</h1>
      <div className='flex items-center gap-4 text-gray-300'>
        <span>Action | Adventure | Sci-Fi</span>
        <div className='flex items-center gap-1'>
          <CalendarIcon className='w-4.5 h-4.5' />2026
        </div>
        <div className='flex items-center gap-1'>
          <ClockIcon className='w-4.5 h-4.5' />2h 8m
        </div>
      </div>
      <p className='max-w-md text-gray-300'>Spider-Man: Brand New Day follows Peter Parker four years after No Way Home as a completely isolated full-time Spider-Man. Having erased himself from the memories of everyone he loves, he lives anonymously in New York</p>
      <button onClick={() => navigate('/movies')} className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
        Explore Movies
        <ArrowRight className='w-5 h-5' />
      </button>
    </div>
  );
}
export default HeroSection