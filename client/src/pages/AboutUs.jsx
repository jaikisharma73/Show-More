import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen pt-12 md:pt-24 px-6 md:px-16 lg:px-24 w-full text-gray-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 border-b border-gray-700 pb-4">About Us</h1>
        <div className="space-y-6 text-lg">
          <p>
            Welcome to JackMov, your premium destination for everything cinema! At JackMov, we believe that movies are more than just entertainment; they are experiences that connect us, inspire us, and allow us to explore countless worlds.
          </p>
          <p>
            Founded by passionate film enthusiasts, JackMov was built with a singular vision: to simplify the movie-going experience while providing users with comprehensive information, seamless booking, and unmatched convenience. Whether you are catching the latest blockbuster on opening night or discovering an indie gem, we're here to ensure your journey from screen to seat is flawless.
          </p>
          <p>
            Our dedicated team is constantly working behind the scenes to optimize our platform, integrate the latest features, and provide top-notch support to our diverse community of movie lovers. We are committed to celebrating the magic of the movies, together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
